/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-21 11:18:59
 * @FilePath: \ink-cli\ink.config.js
 * @description:
 */
module.exports = {
  compileConfig: {
    babelConfig: {
      plugins: ["@vue/babel-plugin-jsx"],
    },
  },
  output: {
    commonjs: "cjs",
    esmodule: "es",
  },
  include: ["mock", "mock2"],
  exclude: ["mock/ignore"],
  target: ["commonjs", "esmodule"],
};
