"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetDir = exports.getRootPath = exports.easyAppendFileSync = exports.easyReadFileSync = exports.removeDir = exports.removeDirs = exports.replaceExt = exports.normalizePath = exports.isFile = exports.isDir = exports.isLess = exports.isJs = exports.isTs = exports.isTsx = exports.isJsx = exports.isSFC = exports.isMD = exports.checkType = exports.handleStyleImportExt = exports.handleScriptImportExt = exports.handleReuireExt = exports.replaceAtImportLessExt = exports.replaceImportLessExt = exports.replaceImportTsExt = exports.replaceImportTsxExt = exports.replaceImportJsxExt = exports.replaceImportVueExt = exports.REQUIRE_REG = exports.AT_IMPORT_LESS_REG = exports.IMPORT_LESS_REG = exports.IMPORT_TS_REG = exports.IMPORT_TSX_REG = exports.IMPORT_JSX_REG = exports.IMPORT_VUE_REG = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 11:26:47
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 23:40:21
 * @FilePath: \ink-cli\src\shared\utils.ts
 * @description:
 */
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var findup_sync_1 = __importDefault(require("findup-sync"));
var config_1 = require("../config/config");
var constant_1 = require("./constant");
exports.IMPORT_VUE_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.vue(\s*['"])/g;
exports.IMPORT_JSX_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.jsx(\s*['"])/g;
exports.IMPORT_TSX_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.tsx(\s*['"])/g;
exports.IMPORT_TS_REG = /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.ts(\s*['"])/g;
exports.IMPORT_LESS_REG = /(import\s+['"]\s*.+)\.less(\s*['"])/g;
exports.AT_IMPORT_LESS_REG = /(@import\s+['"]\s*\.{1,2}\/.+)\.less(\s*['"];)/g;
exports.REQUIRE_REG = /(require\(['"]\s*\.{1,2}\/.+)\.(vue|jsx|ts|tsx)(\s*['"]\))/g;
var jsReplacer = function (_, p1, p2) {
    return "".concat(p1, ".js").concat(p2);
};
var cssReplacer = function (_, p1, p2) {
    return "".concat(p1, ".css").concat(p2);
};
var replaceImportVueExt = function (content) {
    return content.replace(exports.IMPORT_VUE_REG, jsReplacer);
};
exports.replaceImportVueExt = replaceImportVueExt;
var replaceImportJsxExt = function (content) {
    return content.replace(exports.IMPORT_JSX_REG, jsReplacer);
};
exports.replaceImportJsxExt = replaceImportJsxExt;
var replaceImportTsxExt = function (content) {
    return content.replace(exports.IMPORT_TSX_REG, jsReplacer);
};
exports.replaceImportTsxExt = replaceImportTsxExt;
var replaceImportTsExt = function (content) {
    return content.replace(exports.IMPORT_TS_REG, jsReplacer);
};
exports.replaceImportTsExt = replaceImportTsExt;
var replaceImportLessExt = function (content) {
    return content.replace(exports.IMPORT_LESS_REG, cssReplacer);
};
exports.replaceImportLessExt = replaceImportLessExt;
var replaceAtImportLessExt = function (content) {
    return content.replace(exports.AT_IMPORT_LESS_REG, cssReplacer);
};
exports.replaceAtImportLessExt = replaceAtImportLessExt;
var handleReuireExt = function (content) {
    return content.replace(exports.REQUIRE_REG, function (_, p1, __, p3) { return "".concat(p1, ".js").concat(p3); });
};
exports.handleReuireExt = handleReuireExt;
var handleScriptImportExt = function (content) {
    content = (0, exports.replaceImportVueExt)(content);
    content = (0, exports.replaceImportJsxExt)(content);
    content = (0, exports.replaceImportTsxExt)(content);
    content = (0, exports.replaceImportTsExt)(content);
    content = (0, exports.replaceImportLessExt)(content);
    return content;
};
exports.handleScriptImportExt = handleScriptImportExt;
var handleStyleImportExt = function (content) {
    content = (0, exports.replaceAtImportLessExt)(content);
    return content;
};
exports.handleStyleImportExt = handleStyleImportExt;
var checkType = function (filename, ext) {
    if ((0, exports.isDir)(filename))
        return;
    if (!/\.\w+$/.test(filename)) {
        throw new Error("[ink-cli] Filename should be end with '.[string]' like '.md' to check filenametype, got '".concat(filename, "'"));
    }
    return (0, fs_extra_1.pathExistsSync)(filename) && (0, path_1.extname)(filename) === ext;
};
exports.checkType = checkType;
var isMD = function (filename) { return (0, exports.checkType)(filename, '.md'); };
exports.isMD = isMD;
var isSFC = function (filename) { return (0, exports.checkType)(filename, '.vue'); };
exports.isSFC = isSFC;
var isJsx = function (filename) { return (0, exports.checkType)(filename, '.jsx'); };
exports.isJsx = isJsx;
var isTsx = function (filename) { return (0, exports.checkType)(filename, '.tsx'); };
exports.isTsx = isTsx;
var isTs = function (filename) { return (0, exports.checkType)(filename, '.ts'); };
exports.isTs = isTs;
var isJs = function (filename) { return (0, exports.checkType)(filename, '.js'); };
exports.isJs = isJs;
var isLess = function (filename) {
    return (0, exports.checkType)(filename, '.less');
};
exports.isLess = isLess;
var isDir = function (filename) {
    return (0, fs_extra_1.pathExistsSync)(filename) && (0, fs_extra_1.lstatSync)(filename).isDirectory();
};
exports.isDir = isDir;
var isFile = function (filename) {
    return (0, fs_extra_1.pathExistsSync)(filename) && (0, fs_extra_1.lstatSync)(filename).isFile();
};
exports.isFile = isFile;
var normalizePath = function (path) { return path.replace(/\\/g, '/'); };
exports.normalizePath = normalizePath;
var replaceExt = function (filename, ext) {
    return filename.replace((0, path_1.extname)(filename), ext);
};
exports.replaceExt = replaceExt;
var removeDirs = function (dirs) {
    return Promise.all(dirs.map(function (dir) { return (0, fs_extra_1.remove)(dir); }));
};
exports.removeDirs = removeDirs;
var removeDir = function (dir) { return (0, fs_extra_1.remove)(dir); };
exports.removeDir = removeDir;
var easyReadFileSync = function (filename) {
    if ((0, fs_extra_1.pathExistsSync)(filename)) {
        var res = (0, fs_extra_1.readFileSync)(filename, 'utf-8');
        return res;
    }
};
exports.easyReadFileSync = easyReadFileSync;
var easyAppendFileSync = function (filename, content) {
    var c = (0, exports.easyReadFileSync)(filename);
    c.includes(content) || (0, fs_extra_1.appendFileSync)(filename, content);
};
exports.easyAppendFileSync = easyAppendFileSync;
var getRootPath = function () {
    var pkg = (0, findup_sync_1.default)('package.json');
    return pkg && (0, path_1.dirname)(pkg);
};
exports.getRootPath = getRootPath;
var getTargetDir = function () {
    return (0, path_1.resolve)(constant_1.CWD, (0, config_1.mergeConfig)().output[process.env.COMPILE_TARGET]);
};
exports.getTargetDir = getTargetDir;
