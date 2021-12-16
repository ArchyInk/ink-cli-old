/*
 * @author: Archy
 * @Date: 2021-12-14 10:27:13
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 16:14:20
 * @FilePath: \ink-cli\src\config\babel.config.ts
 * @description: 
 */
import type { ConfigAPI } from '@babel/core'

module.exports = (api: ConfigAPI) => {
  if (api) api.cache.never()
  const isCommonJS = process.env.COMPILE_MODULE === 'commonjs'
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isCommonJS ? 'commonjs' : false,
        }
      ],
      require.resolve('@babel/preset-typescript'),
    ],
  }
}
