"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyAppendFileSync = exports.easyReadFileSync = exports.removeDir = exports.removeDirs = exports.replaceExt = exports.isFile = exports.isDir = exports.isLess = exports.isJs = exports.isTsx = exports.isJsx = exports.isSFC = exports.isMD = exports.checkType = exports.handleStyleImportExt = exports.handleScriptImportExt = exports.replaceAtImportLessExt = exports.replaceImportLessExt = exports.replaceImportTsExt = exports.replaceImportTsxExt = exports.replaceImportJsxExt = exports.replaceImportVueExt = exports.AT_IMPORT_LESS_REG = exports.IMPORT_LESS_REG = exports.IMPORT_TS_REG = exports.IMPORT_TSX_REG = exports.IMPORT_JSX_REG = exports.IMPORT_VUE_REG = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 11:26:47
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 20:59:54
 * @FilePath: \ink-cli\src\shared\utils.ts
 * @description:
 */
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
exports.IMPORT_VUE_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.vue(\s*['"])/g;
exports.IMPORT_JSX_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.jsx(\s*['"])/g;
exports.IMPORT_TSX_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.tsx(\s*['"])/g;
exports.IMPORT_TS_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.ts(\s*['"])/g;
exports.IMPORT_LESS_REG = /(import\s+['"]\s*\.{1,2}\/.+)\.less(\s*['"])/g;
exports.AT_IMPORT_LESS_REG = /(@import\s+['"]\s*\.{1,2}\/.+)\.less(\s*['"];)/g;
const jsReplacer = (_, p1, p2) => `${p1}.js${p2}`;
const cssReplacer = (_, p1, p2) => `${p1}.css${p2}`;
const replaceImportVueExt = (content) => content.replace(exports.IMPORT_VUE_REG, jsReplacer);
exports.replaceImportVueExt = replaceImportVueExt;
const replaceImportJsxExt = (content) => content.replace(exports.IMPORT_JSX_REG, jsReplacer);
exports.replaceImportJsxExt = replaceImportJsxExt;
const replaceImportTsxExt = (content) => content.replace(exports.IMPORT_TSX_REG, jsReplacer);
exports.replaceImportTsxExt = replaceImportTsxExt;
const replaceImportTsExt = (content) => content.replace(exports.IMPORT_TS_REG, jsReplacer);
exports.replaceImportTsExt = replaceImportTsExt;
const replaceImportLessExt = (content) => content.replace(exports.IMPORT_LESS_REG, cssReplacer);
exports.replaceImportLessExt = replaceImportLessExt;
const replaceAtImportLessExt = (content) => content.replace(exports.AT_IMPORT_LESS_REG, cssReplacer);
exports.replaceAtImportLessExt = replaceAtImportLessExt;
const handleScriptImportExt = (content) => {
    content = (0, exports.replaceImportVueExt)(content);
    content = (0, exports.replaceImportJsxExt)(content);
    content = (0, exports.replaceImportTsxExt)(content);
    content = (0, exports.replaceImportTsExt)(content);
    content = (0, exports.replaceImportLessExt)(content);
    return content;
};
exports.handleScriptImportExt = handleScriptImportExt;
const handleStyleImportExt = (content) => {
    content = (0, exports.replaceAtImportLessExt)(content);
    return content;
};
exports.handleStyleImportExt = handleStyleImportExt;
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
const isJs = (filename) => (0, exports.checkType)(filename, '.js');
exports.isJs = isJs;
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
const removeDir = (dir) => (0, fs_extra_1.remove)(dir);
exports.removeDir = removeDir;
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
