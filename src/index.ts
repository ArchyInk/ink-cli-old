#!/usr/bin/env node
/*
 * @author: Archy
 * @Date: 2021-12-21 10:27:16
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-16 10:39:33
 * @FilePath: \ink-cli\src\index.ts
 * @description: 
 */
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
