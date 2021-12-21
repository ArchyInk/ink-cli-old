"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfig = exports.getDefaultConfig = exports.getInkConfig = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-17 16:07:44
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 20:56:06
 * @FilePath: \ink-cli\src\config\config.ts
 * @description:
 */
var findup_sync_1 = __importDefault(require("findup-sync"));
var constant_1 = require("../shared/constant");
var lodash_1 = require("lodash");
var getInkConfig = function () {
    var inkConfig = {};
    var inkConfigPath = (0, findup_sync_1.default)('ink.config.(js|ts)');
    delete require.cache[require.resolve(inkConfigPath)];
    inkConfig = require(inkConfigPath);
    if (inkConfig['default'])
        inkConfig = inkConfig.default;
    return inkConfig;
};
exports.getInkConfig = getInkConfig;
var getDefaultConfig = function () {
    var defaultConfig = {};
    delete require.cache[require.resolve(constant_1.CONFIG_DEFAULT_PATH)];
    defaultConfig = require(constant_1.CONFIG_DEFAULT_PATH);
    if (defaultConfig['default'])
        defaultConfig = defaultConfig.default;
    return defaultConfig;
};
exports.getDefaultConfig = getDefaultConfig;
var configCustomizer = function (inkConfig, defaultConfig, key) {
    var babelCusomizer = function (obj, src) {
        if ((0, lodash_1.isArray)(obj) && (0, lodash_1.isArray)(src)) {
            return src.concat(obj);
        }
    };
    switch (key) {
        case 'include':
        case 'exclude':
        case 'target':
            return inkConfig ? inkConfig : defaultConfig;
        case 'output':
            return inkConfig && (0, lodash_1.assign)({}, defaultConfig, inkConfig);
        case 'babelConfig':
            return (0, lodash_1.mergeWith)(inkConfig, defaultConfig, babelCusomizer);
    }
};
var mergeConfig = function () {
    return (0, lodash_1.mergeWith)((0, exports.getInkConfig)(), (0, exports.getDefaultConfig)(), configCustomizer);
};
exports.mergeConfig = mergeConfig;
