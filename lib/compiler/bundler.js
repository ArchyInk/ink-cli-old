"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preCompile = exports.compileFile = exports.compileSingFile = exports.compileDir = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 09:59:40
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 00:14:41
 * @FilePath: \ink-cli\src\compiler\bundler.ts
 * @description:
 */
const path_1 = require("path");
const constant_1 = require("../shared/constant");
const utils_1 = require("../shared/utils");
const fs_extra_1 = require("fs-extra");
const compile_jsx_1 = require("./compile-jsx");
const compile_less_1 = require("./compile-less");
const compile_sfc_1 = require("./compile-sfc");
async function compileDir(dir, options) {
    const dirs = await (0, fs_extra_1.readdir)(dir);
    await Promise.all(dirs.map((filename) => {
        const file = (0, path_1.resolve)(dir, filename);
        return compileFile(file, options);
    }));
}
exports.compileDir = compileDir;
async function compileSingFile(filePath, options) {
    const { base, dir } = (0, path_1.parse)(filePath);
    const copyPath = (0, path_1.resolve)(dir, '_' + base);
    await (0, fs_extra_1.copy)(filePath, copyPath);
    (0, fs_extra_1.pathExistsSync)(filePath) && (await compileFile(filePath, options));
    await (0, fs_extra_1.rename)(copyPath, (0, path_1.resolve)(dir, base));
}
exports.compileSingFile = compileSingFile;
async function compileFile(file, options) {
    (0, utils_1.isSFC)(file) && (await (0, compile_sfc_1.compileSFC)(file, options?.sfcOpt));
    (0, utils_1.isJsx)(file) && (await (0, compile_jsx_1.compileJsx)(file, options?.jsxOpt));
    (0, utils_1.isLess)(file) && (await (0, compile_less_1.compileLess)(file, options?.lessOpt));
    (0, utils_1.isDir)(file) && (await compileDir(file, options));
}
exports.compileFile = compileFile;
async function preCompile(path, options) {
    const fullPath = (0, path_1.resolve)(constant_1.CWD, path);
    if ((0, utils_1.isFile)(fullPath)) {
        await compileSingFile(fullPath, options);
    }
    else if ((0, utils_1.isDir)(fullPath)) {
        await (0, utils_1.removeDirs)([constant_1.ES_DIR]);
        await (0, fs_extra_1.copy)(fullPath, constant_1.ES_DIR);
        const dist = constant_1.ES_DIR;
        await compileDir(dist, options);
    }
}
exports.preCompile = preCompile;
