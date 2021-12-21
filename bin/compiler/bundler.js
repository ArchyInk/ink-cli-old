"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preCompile = exports.umdCompile = exports.compileFile = exports.compileSingFile = exports.compileDir = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 09:59:40
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 23:45:52
 * @FilePath: \ink-cli\src\compiler\bundler.ts
 * @description:
 */
var path_1 = require("path");
var constant_1 = require("../shared/constant");
var nanomatch_1 = require("nanomatch");
var utils_1 = require("../shared/utils");
var fs_extra_1 = require("fs-extra");
var compile_script_1 = require("./compile-script");
var compile_less_1 = require("./compile-less");
var compile_sfc_1 = require("./compile-sfc");
var compile_md_1 = require("./compile-md");
var config_1 = require("../config/config");
/**
 * @description: 编译文件夹
 * @param {string} dir
 * @param {CompileOpt} options
 * @return {*}
 */
function compileDir(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var dirs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, fs_extra_1.readdir)(dir)];
                case 1:
                    dirs = _a.sent();
                    return [4 /*yield*/, Promise.all(dirs.map(function (filename) {
                            var file = (0, path_1.resolve)(dir, filename);
                            return compileFile(file);
                        }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.compileDir = compileDir;
/**
 * @description: 编译单个文件
 * @param {*} filePath
 * @param {CompileOpt} options
 * @return {*}
 */
function compileSingFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, base, dir, copyPath, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = (0, path_1.parse)(filePath), base = _a.base, dir = _a.dir;
                    copyPath = (0, path_1.resolve)(dir, '_' + base);
                    return [4 /*yield*/, (0, fs_extra_1.copy)(filePath, copyPath)];
                case 1:
                    _c.sent();
                    _b = (0, fs_extra_1.pathExistsSync)(filePath);
                    if (!_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, compileFile(filePath)];
                case 2:
                    _b = (_c.sent());
                    _c.label = 3;
                case 3:
                    _b;
                    return [4 /*yield*/, (0, fs_extra_1.rename)(copyPath, (0, path_1.resolve)(dir, base))];
                case 4:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.compileSingFile = compileSingFile;
/**
 * @description: 编译文件
 * @param {string} file
 * @param {CompileOpt} options
 * @return {*}
 */
function compileFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = (0, utils_1.isSFC)(file);
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, compile_sfc_1.compileSFC)(file)];
                case 1:
                    _a = (_f.sent());
                    _f.label = 2;
                case 2:
                    _a;
                    _b = ((0, utils_1.isJsx)(file) || (0, utils_1.isTsx)(file) || (0, utils_1.isJs)(file) || (0, utils_1.isTs)(file));
                    if (!_b) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, compile_script_1.compileScript)(file)];
                case 3:
                    _b = (_f.sent());
                    _f.label = 4;
                case 4:
                    _b;
                    _c = (0, utils_1.isLess)(file);
                    if (!_c) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, compile_less_1.compileLess)(file)];
                case 5:
                    _c = (_f.sent());
                    _f.label = 6;
                case 6:
                    _c;
                    _d = (0, utils_1.isDir)(file);
                    if (!_d) return [3 /*break*/, 8];
                    return [4 /*yield*/, compileDir(file)];
                case 7:
                    _d = (_f.sent());
                    _f.label = 8;
                case 8:
                    _d;
                    _e = (0, utils_1.isMD)(file);
                    if (!_e) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, compile_md_1.compileMd)(file)];
                case 9:
                    _e = (_f.sent());
                    _f.label = 10;
                case 10:
                    _e;
                    return [2 /*return*/];
            }
        });
    });
}
exports.compileFile = compileFile;
function umdCompile() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('umd compile');
            return [2 /*return*/];
        });
    });
}
exports.umdCompile = umdCompile;
/**
 * @description: 编译预操作
 * @param {string} path
 * @param {CompileOpt} options
 * @return {*}
 */
function preCompile() {
    return __awaiter(this, void 0, void 0, function () {
        var target, _a, include, exclude, targetDir;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    target = process.env.COMPILE_TARGET;
                    if (target === 'umd') {
                        // umd由vite处理
                        umdCompile();
                        return [2 /*return*/];
                    }
                    _a = (0, config_1.mergeConfig)(), include = _a.include, exclude = _a.exclude;
                    targetDir = (0, utils_1.getTargetDir)();
                    return [4 /*yield*/, (0, utils_1.removeDir)(targetDir)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, Promise.all(include.map(function (path) { return __awaiter(_this, void 0, void 0, function () {
                            var fullPath, base, targetPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fullPath = (0, path_1.resolve)(constant_1.CWD, path);
                                        if (!(0, utils_1.isFile)(fullPath)) return [3 /*break*/, 1];
                                        // 单个文件的编译结果在文件原位置
                                        return [2 /*return*/, compileSingFile(fullPath)];
                                    case 1:
                                        if (!(0, utils_1.isDir)(fullPath)) return [3 /*break*/, 3];
                                        base = (0, path_1.parse)(fullPath).base;
                                        targetPath = (0, path_1.resolve)(targetDir, base);
                                        return [4 /*yield*/, (0, fs_extra_1.copy)(fullPath, targetPath, {
                                                filter: function (src, dest) {
                                                    var _exclude = exclude.map(function (_) { return (0, utils_1.normalizePath)((0, path_1.resolve)(constant_1.CWD, _)); });
                                                    var _src = (0, utils_1.normalizePath)(src);
                                                    return !(0, nanomatch_1.isMatch)(_src, _exclude);
                                                },
                                            })];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, compileDir(targetPath)];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.preCompile = preCompile;
