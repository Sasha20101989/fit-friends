import 'reflect-metadata';
import { Container } from 'inversify';

import RestApplication from './app/rest.js';
import { AppComponent } from './types/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';

async function bootstrap() {
  const mainContainer = createRestApplicationContainer();

  const application = mainContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap().catch(console.error);
