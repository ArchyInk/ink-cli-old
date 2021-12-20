/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 20:42:42
 * @FilePath: \ink-cli\ink.config.js
 * @description: 
 */
modules.exports = {
  compileConfig: {
    babelConfig: {
      plugins: ['@vue/babel-plugin-jsx'],
    },
  },
  include: ['mock'],
  exclude: ['mock/ignore/**/*'],
  target: ['commonjs', 'esmodule'],
}
