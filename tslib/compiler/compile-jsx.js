"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileJsx = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:11
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 20:51:59
 * @FilePath: \ink-cli\src\compiler\compile-jsx.ts
 * @description:
 */
const fs_extra_1 = require("fs-extra");
const core_1 = require("@babel/core");
const utils_1 = require("../shared/utils");
const compileJsx = async (filePath, options) => {
    try {
        const content = await (0, fs_extra_1.readFile)(filePath, 'utf-8');
        const res = await (0, core_1.transformAsync)(content, { filename: filePath, ...options });
        (0, fs_extra_1.removeSync)(filePath);
        (0, fs_extra_1.writeFileSync)((0, utils_1.replaceExt)(filePath, '.js'), res.code);
    }
    catch (err) {
        throw err;
    }
};
exports.compileJsx = compileJsx;
