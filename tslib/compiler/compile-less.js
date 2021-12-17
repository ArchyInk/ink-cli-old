"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileLess = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:28
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 11:24:22
 * @FilePath: \ink-cli\src\compiler\compile-less.ts
 * @description:
 */
const fs_extra_1 = require("fs-extra");
const less_1 = require("less");
const utils_1 = require("../shared/utils");
async function compileLess(filePath, options) {
    const source = (0, fs_extra_1.readFileSync)(filePath, 'utf-8');
    const { css } = await (0, less_1.render)(source, { filename: filePath, ...options });
    // 删除less源文件会导致后面的less文件引入已经编译后的less文件时无法找到文件,等编译后在删除less?
    // removeSync(filePath)
    (0, fs_extra_1.writeFileSync)((0, utils_1.replaceExt)(filePath, '.css'), css, 'utf-8');
}
exports.compileLess = compileLess;
