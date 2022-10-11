/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2022-10-11 14:49:49
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
    include: ['mock', 'mock2'],
    exclude: ['mock/ignore'],
    target: ['commonjs', 'esmodule', 'umd'],
  },
}
