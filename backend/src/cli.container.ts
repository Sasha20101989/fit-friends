import { Container } from 'inversify';
import { AppComponent } from './types/common/app-component.enum.js';
import CLIApplication from './app/cli.js';

export function createCLIApplicationContainer() {
  const cliApplicationContainer = new Container();
  cliApplicationContainer.bind<CLIApplication>(AppComponent.CLIApplication).to(CLIApplication).inSingletonScope();

  return cliApplicationContainer;
}
