"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @author: Archy
 * @Date: 2021-12-14 09:53:57
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-14 21:05:18
 * @FilePath: \ink-cli\src\cli.ts
 * @description:
 */
const commander_1 = require("commander");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const commands_1 = require("./commands");
const constant_1 = require("./shared/constant");
const program = new commander_1.Command();
program.command('compile')
    .option('-d,--dirPath <dirPath>', 'the path need to compile', constant_1.SRC_DIR)
    .option('-o,--optFile [value]', 'the compiler config file ')
    .description('Compile dir')
    .action(async (options) => {
    const { dirPath, optFile } = options;
    if (optFile) {
        const optFullFile = (0, path_1.resolve)(constant_1.CWD, optFile);
        const optContent = await (0, fs_extra_1.readJson)(optFullFile, 'utf-8');
        (0, commands_1.compile)(dirPath, optContent);
    }
    else {
        (0, commands_1.compile)(dirPath);
    }
});
program.parse();
