"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (api) => {
    if (api)
        api.cache.never();
    const isCommonJS = process.env.COMPILE_MODULE === 'commonjs';
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: isCommonJS ? 'commonjs' : false,
                }
            ],
            require.resolve('@babel/preset-typescript'),
        ],
    };
};
