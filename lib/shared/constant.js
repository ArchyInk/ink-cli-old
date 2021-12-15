"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_PATH = exports.UMD_DIR = exports.LIB_DIR = exports.ES_DIR = exports.SRC_DIR = exports.CWD = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 11:15:56
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 09:56:34
 * @FilePath: \ink-cli\src\shared\constant.ts
 * @description:
 */
const path_1 = require("path");
exports.CWD = process.cwd();
exports.SRC_DIR = (0, path_1.resolve)(exports.CWD, 'src');
exports.ES_DIR = (0, path_1.resolve)(exports.CWD, 'es');
exports.LIB_DIR = (0, path_1.resolve)(exports.CWD, 'lib');
exports.UMD_DIR = (0, path_1.resolve)(exports.CWD, 'umd');
exports.CONFIG_PATH = (0, path_1.resolve)(exports.CWD, 'inkcli.config.json');
