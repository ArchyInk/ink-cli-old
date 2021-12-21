#!/usr/bin/env node
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
