"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyAppendFileSync = exports.easyReadFileSync = exports.removeDirs = exports.replaceExt = exports.isFile = exports.isDir = exports.isLess = exports.isDTS = exports.isTsx = exports.isJsx = exports.isSFC = exports.isMD = exports.checkType = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 11:26:47
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 23:51:03
 * @FilePath: \ink-cli\src\shared\utils.ts
 * @description:
 */
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const checkType = (filename, ext) => {
    if ((0, exports.isDir)(filename))
        return;
    if (!/\.\w+$/.test(filename)) {
        throw new Error(`[ink-cli] Filename should be end with '.[string]' like '.md' to check filenametype, got '${filename}'`);
    }
    return (0, fs_extra_1.pathExistsSync)(filename) && (0, path_1.extname)(filename) === ext;
};
exports.checkType = checkType;
const isMD = (filename) => (0, exports.checkType)(filename, '.md');
exports.isMD = isMD;
const isSFC = (filename) => (0, exports.checkType)(filename, '.vue');
exports.isSFC = isSFC;
const isJsx = (filename) => (0, exports.checkType)(filename, '.jsx');
exports.isJsx = isJsx;
const isTsx = (filename) => (0, exports.checkType)(filename, '.tsx');
exports.isTsx = isTsx;
const isDTS = (filename) => (0, exports.checkType)(filename, '.d.ts');
exports.isDTS = isDTS;
const isLess = (filename) => (0, exports.checkType)(filename, '.less');
exports.isLess = isLess;
const isDir = (filename) => (0, fs_extra_1.pathExistsSync)(filename) && (0, fs_extra_1.lstatSync)(filename).isDirectory();
exports.isDir = isDir;
const isFile = (filename) => (0, fs_extra_1.pathExistsSync)(filename) && (0, fs_extra_1.lstatSync)(filename).isFile();
exports.isFile = isFile;
const replaceExt = (filename, ext) => filename.replace((0, path_1.extname)(filename), ext);
exports.replaceExt = replaceExt;
const removeDirs = (dirs) => Promise.all(dirs.map((dir) => (0, fs_extra_1.remove)(dir)));
exports.removeDirs = removeDirs;
const easyReadFileSync = (filename) => {
    if ((0, fs_extra_1.pathExistsSync)(filename)) {
        const res = (0, fs_extra_1.readFileSync)(filename, 'utf-8');
        return res;
    }
};
exports.easyReadFileSync = easyReadFileSync;
const easyAppendFileSync = (filename, content) => {
    const c = (0, exports.easyReadFileSync)(filename);
    c.includes(content) || (0, fs_extra_1.appendFileSync)(filename, content);
};
exports.easyAppendFileSync = easyAppendFileSync;
