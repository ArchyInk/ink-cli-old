"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @author: Archy
 * @Date: 2021-12-21 10:27:16
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-21 10:29:03
 * @FilePath: \ink-cli\src\index.ts
 * @description:
 */
var commander_1 = require("commander");
var commands_1 = require("./commands");
var program = new commander_1.Command();
program
    .command('compile')
    .description('Compile dir')
    .option('-p,--path [dirPath]', 'the dir or file need to compile')
    .option('-op,--optPath [optPath]', 'the compiler config file')
    .action(commands_1.compile);
program.parse();
