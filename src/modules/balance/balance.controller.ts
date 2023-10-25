import { inject, injectable } from 'inversify';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { BalanceServiceInterface } from './balance-service.interface.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/common.js';
import { Role } from '../../types/role.enum.js';

import { UnknownRecord } from '../../types/unknown-record.type.js';
import CreateBalanceDto from './dto/create-balance.dto.js';
import UpdateBalanceDto from './dto/update-balance.dto.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import BalanceRdo from './rdo/balance.rdo.js';


@injectable()
export default class BalanceController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.BalanceServiceInterface) private readonly balanceService: BalanceServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for BalanceController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateBalanceDto)],
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Patch,
      handler: this.updateBalance,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(UpdateBalanceDto)],
    });
  }

  public async index(
    req: Request,
    res: Response
  ) {

    const{ user } = req;
    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'BalanceController'
      );
    }

    if(user.role != Role.User){
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Access denied: You do not have the required role to perform this action.',
        'BalanceController'
      );
    }

    const balance = await this.balanceService.findByUserId(user.id);

    this.ok(res, fillDTO(BalanceRdo, balance));
  }

  public async create(
    { body , user }: Request<UnknownRecord, UnknownRecord, CreateBalanceDto>,
    res: Response
  ){
    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'BalanceController'
      );
    }

    if(user.role != Role.User){
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Access denied: You do not have the required role to perform this action.',
        'BalanceController'
      );
    }

    if(await this.balanceService.exists(body.training)){
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Balance with training id ${body.training} exists.`,
        'BalanceController'
      );
    }

    const balance = await this.balanceService.create({...body}, user.id);
    this.created(res, fillDTO(BalanceRdo, balance));
  }

  public async updateBalance(
    { body, user }: Request<UnknownRecord, UnknownRecord, UpdateBalanceDto>,
    res: Response
  ) {
    if (!user || user.role !== Role.User) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Access denied: You do not have the required role to perform this action.',
        'BalanceController'
      );
    }

    if (await this.balanceService.exists(body.training) && body.availableQuantity === 0) {
      await this.balanceService.deleteBalance(body.training);
      this.ok(res, { message: 'Balance deleted' });
    } else {
      if (!await this.balanceService.exists(body.training)) {
        throw new HttpError(
          StatusCodes.CONFLICT,
          `Balance with training id ${body.training} not exists.`,
          'BalanceController'
        );
      }

      const updatedBalance = await this.balanceService.updateBalance({ ...body });
      this.ok(res, fillDTO(BalanceRdo, updatedBalance));
    }
  }
}
