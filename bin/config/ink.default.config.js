"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 20:54:06
 * @FilePath: \ink-cli\src\config\ink.default.config.ts
 * @description:
 */
var defaultConfig = function () {
    var isCommonJS = process.env.COMPILE_TARGET === 'commonjs' || process.env.COMPILE_TARGET === 'cjs';
    var babelDefaultPresets = [
        [
            '@babel/preset-env',
            {
                modules: isCommonJS ? 'commonjs' : false,
            },
        ],
        require.resolve('@babel/preset-typescript'),
    ];
    return {
        compileConfig: {
            babelConfig: { presets: babelDefaultPresets },
            jsxOption: {},
            jsOption: {},
            lessOption: {},
            sfcOption: {
                template: {},
                script: {},
                style: {},
            },
        },
        output: {
            esm: 'es',
            esmodule: 'es',
            cjs: 'lib',
            commonjs: 'lib',
            umd: 'umd',
        },
        include: ['src'],
        exclude: [],
        target: ['umd', 'commonjs', 'esmodule'],
    };
};
exports.default = defaultConfig();
