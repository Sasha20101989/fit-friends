import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { BalanceServiceInterface } from './balance-service.interface.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/common.js';
import { Role } from '../../types/role.enum.js';

import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import CreateBalanceDto from './dto/create-balance.dto.js';
import UpdateBalanceDto from './dto/update-balance.dto.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import BalanceRdo from './rdo/balance.rdo.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { ParamsGetTraining } from '../../types/params/params-get-training.type.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { TrainingServiceInterface } from '../training/training-service.interface.js';
import { BalanceQueryParams } from './types/balance-query-params.js';


@injectable()
export default class BalanceController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.BalanceServiceInterface) private readonly balanceService: BalanceServiceInterface,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for BalanceController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User)
      ],
    });

    this.addRoute({
      path: '/training/:trainingId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('trainingId'),
        new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId'),
        new ValidateDtoMiddleware(CreateBalanceDto)
      ],
    });

    this.addRoute({
      path: '/training/:trainingId',
      method: HttpMethod.Patch,
      handler: this.updateBalance,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User),
        new ValidateObjectIdMiddleware('trainingId'),
        new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId'),
        new ValidateDtoMiddleware(UpdateBalanceDto)
      ],
    });
  }

  //TODO:Кабинет пользователь
  public async index(
    { query, user }: Request<core.ParamsDictionary, UnknownRecord, BalanceQueryParams>,
    res: Response
  ) {
    const balance = await this.balanceService.findByUserId(user.id, query);

    this.ok(res, fillDTO(BalanceRdo, balance));
  }

  //TODO:Кабинет пользователь
  public async create(
    { params, body , user }: Request<core.ParamsDictionary | ParamsGetTraining, UnknownRecord, CreateBalanceDto>,
    res: Response
  ){
    const { trainingId } = params;

    if(await this.balanceService.exists(trainingId)){
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Balance with training id ${trainingId} exists.`,
        'BalanceController'
      );
    }

    const balance = await this.balanceService.create({...body}, user.id, trainingId);
    this.created(res, fillDTO(BalanceRdo, balance));
  }

  //TODO:Кабинет пользователь
  public async updateBalance(
    { params, body }: Request<core.ParamsDictionary | ParamsGetTraining, UnknownRecord, UpdateBalanceDto>,
    res: Response
  ) {
    const { trainingId } = params;

    if (await this.balanceService.exists(trainingId) && body.availableQuantity === 0) {
      await this.balanceService.deleteBalance(trainingId);
      this.ok(res, { message: 'Balance deleted' });
    } else {
      if (!await this.balanceService.exists(trainingId)) {
        throw new HttpError(
          StatusCodes.NOT_FOUND,
          `Balance with training id ${trainingId} not exists.`,
          'BalanceController'
        );
      }

      const updatedBalance = await this.balanceService.updateBalance({ ...body }, trainingId);
      this.ok(res, fillDTO(BalanceRdo, updatedBalance));
    }
  }
}
