/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2022-10-11 15:39:28
 * @FilePath: \ink-cli\ink.config.js
 * @description:
 */
module.exports = {
  name: 'mock',
  entry: 'mock/index.ts',
  compileConfig: {
    babelConfig: {
      plugins: ['@vue/babel-plugin-jsx'],
    },
    output: {
      commonjs: 'cjs',
      esmodule: 'es',
    },
    include: ['mock'],
    exclude: ['mock/ignore'],
    target: ['commonjs', 'esmodule', 'umd'],
  },
}
