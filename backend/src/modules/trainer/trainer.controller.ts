import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { TrainerServiceInterface } from './trainer-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateTrainerDto from './dto/create-trainer.dto.js';
import TrainerRdo from './rdo/trainer.rdo.js';
import { Role } from '../../types/role.enum.js';
import { ParamsGetUser } from '../../types/params/params-get-user.type.js';
import UpdateTrainerDto from './dto/update-trainer.dto.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';

@injectable()
export default class TrainerController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.TrainerServiceInterface) private readonly trainerService: TrainerServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for TrainerController...');

    this.addRoute({ path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateTrainerDto)
      ]
    });
    this.addRoute({ path: '/',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(UpdateTrainerDto)
      ]
    });
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateTrainerDto>,
    res: Response
  ): Promise<void> {
    const existsTrainer = await this.trainerService.findByEmail(body.email);

    if (existsTrainer) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Trainer with email «${body.email}» exists.`,
        'TrainerController'
      );
    }

    const result = await this.trainerService.create({...body, role: Role.Trainer}, this.configService.get('SALT_ROUNDS'));

    //setAccessTokenCookie(res, result.accessToken, this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME'));

    this.created(res, fillDTO(TrainerRdo, result.user));
  }

  public async update(
    { body, user }: Request<core.ParamsDictionary | ParamsGetUser, UnknownRecord, UpdateTrainerDto>,
    res: Response
  ): Promise<void> {

    const updatedUser = await this.trainerService.updateById(user.id, body);

    if (!updatedUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Trainer with email ${user.email} not found.`,
        'TrainerController'
      );
    }

    this.ok(res, fillDTO(TrainerRdo, updatedUser));
  }
}
