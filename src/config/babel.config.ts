/*
 * @author: Archy
 * @Date: 2021-12-14 10:27:13
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 20:40:36
 * @FilePath: \ink-cli\src\config\babel.config.ts
 * @description:
 */

module.exports = (api: any, options: { loose: boolean }) => {
  if (api) api.cache.never()
  const isCommonJS = process.env.COMPILE_TARGET === 'commonjs'
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isCommonJS ? 'commonjs' : false,
          loose: options.loose,
        },
      ],
      require.resolve('@babel/preset-typescript'),
    ],
  }
}

export default module.exports
