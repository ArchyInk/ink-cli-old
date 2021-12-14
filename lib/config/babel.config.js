/*
 * @author: Archy
 * @Date: 2021-12-14 10:27:13
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-14 11:11:33
 * @FilePath: \ink-cli\src\config\babel.config.ts
 * @description:
 */
module.exports = (api) => {
    if (api)
        api.cache.never();
    return {
        presets: [
            [
                '@babel/preset-env',
            ]
        ],
    };
};
