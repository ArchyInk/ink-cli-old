/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-22 21:56:54
 * @FilePath: \ink-cli\src\config\ink.default.config.ts
 * @description:
 */
const defaultConfig = () => {
  const isCommonJS =
    process.env.COMPILE_TARGET === 'commonjs' ||
    process.env.COMPILE_TARGET === 'cjs'
  const babelDefaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: isCommonJS ? 'commonjs' : false,
      },
    ],
    require.resolve('@babel/preset-typescript'),
  ]
  return {
    name: 'ink-dest',
    entry: 'index.js',
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
    },
  }
}

export default defaultConfig()
