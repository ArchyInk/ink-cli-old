"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @author: Archy
 * @Date: 2021-12-14 09:53:57
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 23:58:01
 * @FilePath: \ink-cli\src\cli.ts
 * @description:
 */
const commander_1 = require("commander");
const commands_1 = require("./commands");
const constant_1 = require("./shared/constant");
const program = new commander_1.Command();
program
    .command('compile')
    .description('Compile dir')
    .option('-p,--path [dirPath]', 'the dir or file need to compile', constant_1.SRC_DIR)
    .option('-op,--optPath [optPath]', 'the compiler config file', constant_1.CONFIG_PATH)
    .action(commands_1.compile);
program.parse();
