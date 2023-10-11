#!/usr/bin/env node
import 'reflect-metadata';

import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/helper.command.js';
import ImportCommand from './core/cli-command/import.command.js';

const cliApp = new CLIApplication();
cliApp.registerCommands([
  new HelpCommand(), new ImportCommand()
]);
cliApp.processCommand(process.argv);
