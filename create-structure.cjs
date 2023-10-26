const fs = require('fs');
const path = require('path');

function createCustomStructure(directory, name) {
  const folderPath = path.join(directory, name);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const dtoPath = path.join(folderPath, 'dto');
  if (!fs.existsSync(dtoPath)) {
    fs.mkdirSync(dtoPath);
  }

  const rdoPath = path.join(folderPath, 'rdo');
  if (!fs.existsSync(rdoPath)) {
    fs.mkdirSync(rdoPath);
  }

  const dtoFiles = [`create-${name}.dto.ts`, `update-${name}.dto.ts`];
  dtoFiles.forEach((file) => {
    const filePath = path.join(dtoPath, file);
    if (!fs.existsSync(filePath)) {
      const capitalazedName = capitalizeFirstLetter(name);
      if(file === `create-${name}.dto.ts`){
        const createDtoContent = `
import { IsNotEmpty, IsEmail, Matches, IsOptional, MaxLength, MinLength, IsEnum, IsNumber, IsInt, Min } from 'class-validator';

export default class Create${capitalazedName}Dto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Zа-яА-Я\\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(0, { message: 'Minimum name length must be 0' })
  @MaxLength(0, { message: 'Maximum name length must be 0' })
  public name!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  @Matches(/\\.(jpg|png)$/, { message: 'Avatar must be in JPG or PNG format' })
  @IsOptional()
  public avatar?: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsInt({ message: 'Price must be an integer' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  public price!: number;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(0, { message: 'Minimum password length must be 0' })
  @MaxLength(0, { message: 'Maximum password length must be 0' })
  public password!: string;

  @IsEnum(Enum, { message: 'Invalid gender' })
  public gender!: Enum;
}
`;
      fs.writeFileSync(filePath, createDtoContent, 'utf-8');
      } else if(file === `update-${name}.dto.ts`) {
        const updateDtoContent = `
import { IsNotEmpty, IsEmail, Matches, IsOptional, MaxLength, MinLength, IsEnum, IsNumber, IsInt, Min } from 'class-validator';

export default class Update${capitalazedName}Dto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Zа-яА-Я\\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(0, { message: 'Minimum name length must be 0' })
  @MaxLength(0, { message: 'Maximum name length must be 0' })
  public name?: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email?: string;

  @Matches(/\\.(jpg|png)$/, { message: 'Avatar must be in JPG or PNG format' })
  @IsOptional()
  public avatar?: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsInt({ message: 'Price must be an integer' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  public price?: number;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(0, { message: 'Minimum password length must be 0' })
  @MaxLength(0, { message: 'Maximum password length must be 0' })
  public password?: string;

  @IsEnum(Enum, { message: 'Invalid gender' })
  public gender?: Enum;
}
`;
      fs.writeFileSync(filePath, updateDtoContent, 'utf-8');
      }else{
        fs.writeFileSync(filePath, '', 'utf-8');
      }
    }
  });

  const rdoFiles = [`${name}.rdo.ts`];
  rdoFiles.forEach((file) => {
    const filePath = path.join(rdoPath, file);
    if (!fs.existsSync(filePath)) {
      const capitalazedName = capitalizeFirstLetter(name);
      if(file === `${name}.rdo.ts`) {
        const RdoContent = `
import { Expose, Type } from 'class-transformer';

export default class ${capitalazedName}Rdo {
  @Expose()
  public id!: string;

  @Expose()
  public trainingLevel!: TrainingLevel;

  @Expose({ name: 'trainer'})
  @Type(() => TrainerRdo)
  public trainer!: TrainerRdo;
}
`;
      fs.writeFileSync(filePath, RdoContent, 'utf-8');
      }else{
        fs.writeFileSync(filePath, '', 'utf-8');
      }
    }
  });

  const rootFiles = [
    `${name}-service.interface.ts`,
    `${name}-service.ts`,
    `${name}.container.ts`,
    `${name}.controller.ts`,
    `${name}.entity.ts`,
    `${name}.http`
  ];
  rootFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (!fs.existsSync(filePath)) {
      const capitalazedName = capitalizeFirstLetter(name);
      if (file === `${name}-service.interface.ts`) {
        const interfaceContent = `
import { DocumentType } from '@typegoose/typegoose';
import Create${capitalazedName}Dto from './dto/create-${name}.dto.js';
import { ${capitalazedName}Entity } from './${name}.entity.js';

export interface ${capitalazedName}ServiceInterface {
  create(dto: Create${capitalazedName}Dto, salt: string): Promise<DocumentType<${capitalazedName}Entity>>;
  findById(${name}Id: string): Promise<DocumentType<${capitalazedName}Entity> | null>;
  exists(documentId: string): Promise<boolean>;
}
`;
        fs.writeFileSync(filePath, interfaceContent, 'utf-8');
      } else if(file === `${name}.entity.ts`){
        const entityContent = `
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

import { ${capitalazedName} } from '../../types/${name}.type.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface ${capitalazedName}Entity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: '${name}'
  },
  options: {
    allowMixed: 0
  }
})

export class ${capitalazedName}Entity extends defaultClasses.TimeStamps implements ${capitalazedName} {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, ref: BalanceEntity })
  public balance!: Ref<BalanceEntity[]>;

  constructor(${name}Data: Create${capitalazedName}Dto) {
    super();

    this.name = ${name}Data.name;
  }

  public async setPassword(password: string, _saltRounds: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
  }

  public getPassword() {
    return this.password;
  }

  public async verifyPassword(password: string) {
    if (this.password) {
      return await bcrypt.compare(password, this.password);
    }
    return false;
  }

  public AddFriend(friendId: string) {
    if (!this.friends.includes(friendId)) {
      this.friends.push(friendId);
    }
  }
}

export const ${capitalazedName}Model = getModelForClass(${capitalazedName}Entity);
`;
        fs.writeFileSync(filePath, entityContent, 'utf-8');
      } else if(file === `${name}.container.ts`){
        const containerContent = `
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { ${capitalazedName}ServiceInterface } from './${name}-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import ${capitalazedName}Service from './${name}-service.js';
import { ${capitalazedName}Entity, ${capitalazedName}Model } from './${name}.entity.js';
import ${capitalazedName}Controller from './${name}.controller.js';

export function create${capitalazedName}Container() {
  const ${name}Container = new Container();
  ${name}Container.bind<${capitalazedName}ServiceInterface>(AppComponent.${capitalazedName}ServiceInterface).to(${capitalazedName}Service).inSingletonScope();
  ${name}Container.bind<ModelType<${capitalazedName}Entity>>(AppComponent.${capitalazedName}Model).toConstantValue(${capitalazedName}Model);
  ${name}Container.bind<ControllerInterface>(AppComponent.${capitalazedName}Controller).to(${capitalazedName}Controller).inSingletonScope();

  return ${name}Container;
}
`;
        fs.writeFileSync(filePath, containerContent, 'utf-8');
      } else if(file === `${name}-service.ts`){
        const serviceContent = `
import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { NotifyServiceInterface } from './notify-service.interface.js';
import { NotifyEntity } from './notify.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateNotifyDto from './dto/create-notify.dto.js';
import { MongoId } from './../../types/mongo-id.type';

@injectable()
export default class NotifyService implements NotifyServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.NotifyModel) private readonly notifyModel: types.ModelType<NotifyEntity>
    ){}

  public async create(dto: CreateNotifyDto, salt: string): Promise<DocumentType<NotifyEntity>> {
    throw new Error('Method not implemented.');
  }

  public async findById(notifyId: string): Promise<DocumentType<NotifyEntity> | null> {
    throw new Error('Method not implemented.');
  }

  public async exists(MongoId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
`;
        fs.writeFileSync(filePath, serviceContent, 'utf-8');
      } else if(file === `${name}.controller.ts`){
        const controllerContent = `
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ${capitalazedName}ServiceInterface } from './${name}-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import Create${capitalazedName}Dto from './dto/create-${name}.dto.js';
import ${capitalazedName}Rdo from './rdo/${name}.rdo.js';

@injectable()
export default class ${capitalazedName}Controller extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.${capitalazedName}ServiceInterface) private readonly ${name}Service: ${capitalazedName}ServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for ${capitalazedName}Controller...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(Create${capitalazedName}Dto)] });
  }

}
`;
        fs.writeFileSync(filePath, controllerContent, 'utf-8');
      }
      else {
        fs.writeFileSync(filePath, '', 'utf-8');
      }
    }
  });

  console.log(`Структура модуля "${name}" создана в директории "${directory}".`)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const targetDirectory = process.argv[2];
const projectName = process.argv[3];

if (targetDirectory && projectName) {
  createCustomStructure(targetDirectory, projectName);
} else {
  console.error('Укажите директорию и имя модуля.');
}
