/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 17:22:14
 * @FilePath: \ink-cli\src\config\ink.default.config.ts
 * @description:
 */
const defaultConfig = () => {
  const isCommonJS = process.env.COMPILE_TARGET === 'commonjs' || process.env.COMPILE_TARGET === 'cjs'
  const babelDefaultConfig = [
    [
      '@babel/preset-env',
      {
        modules: isCommonJS ? 'commonjs' : false,
      },
    ],
    require.resolve('@babel/preset-typescript'),
  ]
  return {
    compileConfig: {
      babelConfig: { presets: babelDefaultConfig },
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
  }
}

export default defaultConfig()
