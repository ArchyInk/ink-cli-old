/*
 * @Author: Archy
 * @Date: 2021-12-17 20:41:08
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 20:44:02
 * @FilePath: \ink-cli\preset.js
 * @description:
 */
const babelConfig = require('./tslib/config/babel.config')

module.exports = (api, options) => babelConfig(api, options)
