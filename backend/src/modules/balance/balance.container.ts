import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { BalanceServiceInterface } from './balance-service.interface.js';
import BalanceService from './balance-service.js';
import { BalanceEntity, BalanceModel } from './balance.entity.js';
import BalanceController from './balance.controller.js';


export function createBalanceContainer() {
  const balanceContainer = new Container();
  balanceContainer.bind<BalanceServiceInterface>(AppComponent.BalanceServiceInterface).to(BalanceService).inSingletonScope();
  balanceContainer.bind<ModelType<BalanceEntity>>(AppComponent.BalanceModel).toConstantValue(BalanceModel);
  balanceContainer.bind<ControllerInterface>(AppComponent.BalanceController).to(BalanceController).inSingletonScope();

  return balanceContainer;
}
