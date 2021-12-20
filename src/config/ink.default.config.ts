/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 20:31:05
 * @FilePath: \ink-cli\src\config\ink.default.config.ts
 * @description:
 */
export default {
  compileConfig: {
    babelConfig: {},
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
    esm: '/es',
    esmodule: '/es',
    cjs: '/lib',
    commonjs: '/lib',
    umd: '/umd',
  },
  include: ['src'],
  exclude: [],
  target: ['umd', 'commonjs', 'esm'],
}
