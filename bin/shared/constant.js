"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPILE_TARGET_LIST = exports.INK_CONFIG_REG = exports.CONFIG_DEFAULT_PATH = exports.UMD_DIR = exports.LIB_DIR = exports.ES_DIR = exports.SRC_DIR = exports.CWD = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 11:15:56
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 22:57:55
 * @FilePath: \ink-cli\src\shared\constant.ts
 * @description:
 */
var path_1 = require("path");
exports.CWD = process.cwd();
exports.SRC_DIR = (0, path_1.resolve)(exports.CWD, 'src');
exports.ES_DIR = (0, path_1.resolve)(exports.CWD, 'es');
exports.LIB_DIR = (0, path_1.resolve)(exports.CWD, 'lib');
exports.UMD_DIR = (0, path_1.resolve)(exports.CWD, 'umd');
exports.CONFIG_DEFAULT_PATH = (0, path_1.resolve)(__dirname, '..', 'config', 'ink.default.config.js');
exports.INK_CONFIG_REG = /ink\.config\.(json|js|ts)/g;
exports.COMPILE_TARGET_LIST = ['commonjs', 'umd', 'cjs', 'esm', 'esmodule'];
