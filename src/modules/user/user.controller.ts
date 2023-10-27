import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { UserServiceInterface } from './user-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import type { UnknownRecord } from '../../types/unknown-record.type.js';
import type { ParamsGetUser } from '../../types/params-get-user.type.js';
import type { UserQueryParams } from '../../types/user-query-params.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { Token } from '../../types/token.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import HttpError from '../../core/errors/http-error.js';
import { clearCookie, fillDTO, setRefreshTokenCookie } from '../../core/helpers/index.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import LoggedUserRdo from './rdo/logged-user.rdo.js';
import UserRdo from './rdo/user.rdo.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UserExistsByEmailMiddleware } from '../../core/middlewares/user-exists-by-email-middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { Role } from '../../types/role.enum.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';


@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
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
    this.addRoute({ path: '/email',
      method: HttpMethod.Get,
      handler: this.findByEmail,
      middlewares: [
        new UserExistsByEmailMiddleware(this.userService)
      ]
    });
    this.addRoute({ path: '/:userId',
      method: HttpMethod.Put,
      handler: this.updateById,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new ValidateDtoMiddleware(UpdateUserDto)
      ]
    });
    this.addRoute({ path: '/refresh',
      method: HttpMethod.Get,
      handler: this.refreshToken,
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
  }

  public async index(
    req: Request<UnknownRecord, UnknownRecord, UnknownRecord, UserQueryParams>,
    res: Response
  ) {
    const { location, workoutTypes, trainingLevel, sortBy } = req.query;

    const userUqery: UserQueryParams = { location, workoutTypes, trainingLevel, sortBy };

    const users = await this.userService.GetAllUsers(userUqery);

    this.ok(res, fillDTO(UserRdo, users || []));
  }

  public async refreshToken(
    req: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response
  ){
    const { refreshToken } = req.cookies;
    const { body } = req;
    const userData = await this.userService.refresh(refreshToken, body);

    if (!userData) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    setRefreshTokenCookie(res, userData.refreshToken, this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'));

    this.ok(res, { message: 'Token updated' });
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

  public async findByEmail(
    { body }: Request<core.ParamsDictionary | ParamsGetUser>,
    res: Response
  ): Promise<void> {
    const { email } = body;
    const user = await this.userService.findByEmail(email);

    this.ok(res, fillDTO(UserRdo, user));
  }

  public async login(
    req: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response
  ): Promise<void> {
    if (req.user) {
      this.ok(res, {});
      return;
    }

    const result = await this.userService.verifyUser(req.body, this.configService.get('SALT'));

    if (!result?.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    setRefreshTokenCookie(res, result.refreshToken, this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'));

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
        StatusCodes.BAD_REQUEST,
        'Invalid refreshToken provided in the request.',
        'UserController'
      );
    }

    await this.userService.logout(refreshToken);
    clearCookie(res, Token.Refresh);
    this.ok(res, { message: 'Logout successful' });
  }

  public async updateById(
    req: Request<core.ParamsDictionary | ParamsGetUser, UnknownRecord, UpdateUserDto>,
    res: Response
  ): Promise<void> {
    const { userId } = req.params;

    if (req.user.id !== userId) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized to update this profile.',
        'UserController'
      );
    }

    const updatedUser = await this.userService.updateById(userId, req.body);

    if (!updatedUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with id ${userId} not found.`,
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

    const result = await this.userService.create(body, this.configService.get('SALT'));

    setRefreshTokenCookie(res, result.refreshToken, this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'));

    this.created(
      res,
      fillDTO(UserRdo, result.user)
    );
  }
}
