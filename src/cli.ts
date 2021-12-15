/*
 * @author: Archy
 * @Date: 2021-12-14 09:53:57
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 23:58:01
 * @FilePath: \ink-cli\src\cli.ts
 * @description:
 */
import { Command } from 'commander'
import { compile } from './commands'
import { SRC_DIR, CWD, CONFIG_PATH } from './shared/constant'
const program = new Command()
program
  .command('compile')
  .description('Compile dir')
  .option('-p,--path [dirPath]', 'the dir or file need to compile', SRC_DIR)
  .option('-op,--optPath [optPath]', 'the compiler config file', CONFIG_PATH)
  .action(compile)

program.parse()
