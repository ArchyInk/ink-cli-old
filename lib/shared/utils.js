"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDirs = exports.replaceExt = exports.isDir = exports.isLess = exports.isDTS = exports.isTsx = exports.isJsx = exports.isSFC = exports.isMD = exports.checkType = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 11:26:47
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-14 20:52:27
 * @FilePath: \ink-cli\src\shared\utils.ts
 * @description:
 */
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const checkType = (file, ext) => {
    if ((0, exports.isDir)(file))
        return;
    if (!/\.\w+$/.test(file)) {
        throw new Error(`[ink-cli] Filename should be end with '.[string]' like '.md' to check filetype, got '${file}'`);
    }
    return (0, path_1.extname)(file) === ext;
};
exports.checkType = checkType;
const isMD = (file) => (0, exports.checkType)(file, '.md');
exports.isMD = isMD;
const isSFC = (file) => (0, exports.checkType)(file, '.vue');
exports.isSFC = isSFC;
const isJsx = (file) => (0, exports.checkType)(file, '.jsx');
exports.isJsx = isJsx;
const isTsx = (file) => (0, exports.checkType)(file, '.tsx');
exports.isTsx = isTsx;
const isDTS = (file) => (0, exports.checkType)(file, '.d.ts');
exports.isDTS = isDTS;
const isLess = (file) => (0, exports.checkType)(file, '.less');
exports.isLess = isLess;
const isDir = (file) => (0, fs_extra_1.pathExistsSync)(file) && (0, fs_extra_1.lstatSync)(file).isDirectory();
exports.isDir = isDir;
const replaceExt = (file, ext) => file.replace((0, path_1.extname)(file), ext);
exports.replaceExt = replaceExt;
const removeDirs = (dirs) => Promise.all(dirs.map((dir) => (0, fs_extra_1.remove)(dir)));
exports.removeDirs = removeDirs;
