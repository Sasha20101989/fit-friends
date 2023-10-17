import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { TrainerServiceInterface } from './trainer-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import { DEFAULT_MAX_AGE_TOKEN } from '../user/user.const.js';
import { Token } from '../../types/token.enum.js';
import CreateTrainerDto from './dto/create-trainer.dto.js';
import TrainerRdo from './rdo/trainer.rdo.js';

@injectable()
export default class TrainerController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.TrainerServiceInterface) private readonly trainerService: TrainerServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for TrainerController...');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateTrainerDto)] });
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateTrainerDto>,
    res: Response
  ): Promise<void> {
    const existsTrainer = await this.trainerService.findByEmail(body.email);

    if (existsTrainer) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'TrainerController'
      );
    }

    const result = await this.trainerService.create(body, this.configService.get('SALT'));

    this.setRefreshTokenCookie(res, result.refreshToken);

    this.created(
      res,
      fillDTO(TrainerRdo, result.user)
    );
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    const expirationTime = this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME');
    const numericValue = parseInt(expirationTime, 10);
    let maxAge;

    if (expirationTime.endsWith('d')) {
      maxAge = numericValue * 24 * 60 * 60 * 1000;
    } else {
      maxAge = DEFAULT_MAX_AGE_TOKEN * 24 * 60 * 60 * 1000;
    }

    res.cookie(Token.Refresh, refreshToken, { maxAge, httpOnly: true });
  }

}
