import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { UserServiceInterface } from './user-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import type { UnknownRecord } from '../../types/common/unknown-record.type.js';
import type { ParamsGetUser } from '../../types/params/params-get-user.type.js';
import type { UserQueryParams } from './types/user-query-params.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { Token } from '../token/types/token.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { clearCookie, fillDTO } from '../../core/helpers/index.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/refresh-token.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import LoggedUserRdo from './rdo/logged-user.rdo.js';
import UserRdo from './rdo/user.rdo.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UserExistsByEmailMiddleware } from '../../core/middlewares/user-exists-by-email-middleware.js';
import { Role } from '../../types/role.enum.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import TrainerRdo from '../trainer/rdo/trainer.rdo.js';
import { TokenServiceInterface } from '../token/token-service.interface.js';
import AccessTokenRdo from '../token/rdo/access-token.rdo.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';
import { UploadFileMiddleware } from '../../core/middlewares/upload-file.middleware.js';
import { HttpError } from '../../core/errors/http-error.js';


@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.TokenServiceInterface) private readonly tokenService: TokenServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for UserController...');

    this.addRoute({ path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({ path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new UserExistsByEmailMiddleware(this.userService),
        new ValidateDtoMiddleware(LoginUserDto)
      ]
    });
    this.addRoute({ path: '/logout',
      method: HttpMethod.Post,
      handler: this.logout
    });
    this.addRoute({path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User)
      ]
    });
    this.addRoute({ path: '/',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(UpdateUserDto)
      ]
    });
    this.addRoute({ path: '/refresh',
      method: HttpMethod.Post,
      handler: this.refreshAccessToken,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto)
      ]
    });
    this.addRoute({ path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({ path: '/:userId',
      method: HttpMethod.Get,
      handler: this.showUserDetails,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId')
      ]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async uploadAvatar(req: Request, res: Response) {
    const {userId} = req.params;
    const uploadFile = {avatar: req.file?.filename};
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, uploadFile));
  }

  public async showUserDetails(
    { params }: Request,
    res: Response
  ): Promise<void> {
    const { userId } = params;
    const user = await this.userService.findUserOrTrainerById(userId);

    if(user?.role === Role.User){
      this.ok(res, fillDTO(UserRdo, user));
    }else{
      this.ok(res, fillDTO(TrainerRdo, user));
    }
  }

  public async index(
    req: Request<UnknownRecord, UnknownRecord, UserQueryParams>,
    res: Response
  ) {
    const userUqery: UserQueryParams = req.query;

    const users = await this.userService.GetAllUsers(userUqery);

    this.ok(res, fillDTO(UserRdo, users || []));
  }

  public async refreshAccessToken(
    req: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response
  ){
    if (!req.body.refreshToken || typeof req.body.refreshToken !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid Refresh Token Format',
        'UserController'
      );
    }

    if(!this.tokenService.exists(req.body.refreshToken)){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Refresh token with not found.`,
        'UserController'
      );
    }

    const accessToken = await this.userService.refreshAccessToken(req.body.refreshToken);

    if (!accessToken) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Invalid Refresh Token',
        'UserController'
      );
    }

    this.ok(res, fillDTO(AccessTokenRdo, accessToken));
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const { user: { email } } = req;
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async login(
    { user, body }: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response
  ): Promise<void> {
    if (user) {
      this.ok(res, {});
      return;
    }

    const result = await this.userService.verifyUser(body, this.configService.get('SALT_ROUNDS'));

    if (!result?.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, {
      ...fillDTO(LoggedUserRdo, result.user),
      accessToken: result.accessToken,
      refreshToken: result.refreshToken
    });
  }

  public async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid refreshToken provided in the request.',
        'UserController'
      );
    }

    await this.userService.logout(refreshToken);
    clearCookie(res, Token.Refresh);
    this.ok(res, { message: 'Logout successful' });
  }

  public async update(
    { body, user }: Request<core.ParamsDictionary | ParamsGetUser, UnknownRecord, UpdateUserDto>,
    res: Response
  ): Promise<void> {

    const updatedUser = await this.userService.updateById(user.id, body);

    if (!updatedUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with email ${user.email} not found.`,
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, updatedUser));
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateUserDto>,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create({...body, role: Role.User}, this.configService.get('SALT_ROUNDS'));

    this.created(
      res,
      fillDTO(UserRdo, result.user)
    );
  }
}
