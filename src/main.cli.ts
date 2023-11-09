#!/usr/bin/env node
import 'reflect-metadata';

import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/helper.command.js';
import ImportCommand from './core/cli-command/import.command.js';
import { createCLIApplicationContainer } from './cli.container.js';
import { AppComponent } from './types/common/app-component.enum.js';

async function bootstrap() {
  const cliContainer = createCLIApplicationContainer();

  const application = cliContainer.get<CLIApplication>(AppComponent.CLIApplication);

  application.registerCommands([
    new HelpCommand(), new ImportCommand()
  ]);

  application.processCommand(process.argv);
}

bootstrap().catch(console.error);
