/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 15:23:28
 * @FilePath: \ink-cli\src\config\ink.default.config.ts
 * @description:
 */
const defaultConfig = () => {
  const isCommonJS = process.env.COMPILE_TARGET === 'commonjs' || 'cjs'
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
