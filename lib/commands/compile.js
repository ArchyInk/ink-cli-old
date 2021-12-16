"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.runTask = void 0;
/*
 * @Author: Archy
 * @Date: 2021-12-15 20:12:24
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 16:40:15
 * @FilePath: \ink-cli\src\commands\compile.ts
 * @description:
 */
const bundler_1 = require("../compiler/bundler");
const ora_1 = __importDefault(require("ora"));
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../shared/constant");
const path_1 = require("path");
async function runTask(taskName, task, path, options) {
    const taskStart = (0, ora_1.default)().start(`Compiling ${taskName}`);
    try {
        await task(path, options);
        taskStart.succeed(`Compilation ${taskName} completed!`);
    }
    catch (e) {
        console.log(e);
        taskStart.fail(`Compilation ${taskName} failed!`);
    }
}
exports.runTask = runTask;
async function compile(cmd) {
    const { path, optPath } = cmd;
    optPath === constant_1.CONFIG_PATH ? constant_1.CONFIG_PATH : (0, path_1.resolve)(constant_1.CWD, optPath);
    const options = await (0, fs_extra_1.readJson)(optPath, 'utf-8');
    runTask('normal', bundler_1.preCompile, path, options);
}
exports.compile = compile;
