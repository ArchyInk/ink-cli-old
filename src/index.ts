<<<<<<< HEAD
/*
 * @author: Archy
 * @Date: 2021-12-21 10:27:16
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-21 12:17:01
 * @FilePath: \ink-cli\src\index.ts
 * @description: 
 */
=======
#!/usr/bin/env node
>>>>>>> 4e68611be46e82ab9c66085c2b2e0aabf5dad4bb
import { Command } from 'commander'
import { compile } from './commands'
const program = new Command()
program.version(`ink-cli ${require('../package.json').version}`).usage('<command> [options]')
program
  .command('compile')
  .description('Compile dir')
  .option('-p,--path [dirPath]', 'the dir or file need to compile')
  .option('-op,--optPath [optPath]', 'the compiler config file')
  .action(compile)

program.parse()
