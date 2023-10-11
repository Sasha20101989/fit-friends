import chalk from 'chalk';

import type { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.yellow(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            ${chalk.green('--help')}:                      # Печатает этот текст
            ${chalk.green('--import <path>')}:             # Импортирует в базу данных информацию из tsv-файла. Путь к файлу передаётся в параметре <path>.
    `));
  }
}
