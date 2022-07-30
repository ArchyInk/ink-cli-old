/*
 * @author: Archy
 * @Date: 2021-12-17 16:07:44
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-31 16:43:07
 * @FilePath: \ink-cli\src\config\config.ts
 * @description:
 */
import findup from 'findup-sync'
import { CONFIG_DEFAULT_PATH, CWD } from '../shared/constant'
import { mergeWith, assign, isArray } from 'lodash'
import { InlineConfig } from 'vite'
import { resolve } from 'path'
export const getInkConfig = () => {
  let inkConfig: any = {}
  const inkConfigPath = findup('ink.config.(js|ts)')
  if (!inkConfigPath) {
    return inkConfig
  }
  delete require.cache[require.resolve(inkConfigPath)]
  inkConfig = require(inkConfigPath)
  if (inkConfig['default']) inkConfig = inkConfig.default
  inkConfig.filePath = inkConfigPath
  return inkConfig
}

export const getDefaultConfig = () => {
  let defaultConfig: any = {}
  delete require.cache[require.resolve(CONFIG_DEFAULT_PATH)]
  defaultConfig = require(CONFIG_DEFAULT_PATH)
  if (defaultConfig['default']) defaultConfig = defaultConfig.default
  return defaultConfig
}

const configCustomizer = (inkConfig, defaultConfig, key) => {
  const babelCusomizer = (obj, src) => {
    if (isArray(obj) && isArray(src)) {
      return src.concat(obj)
    }
  }
  switch (key) {
    case 'name':
    case 'entry':
    case 'include':
    case 'exclude':
    case 'target':
      return inkConfig ? inkConfig : defaultConfig
    case 'output':
      return inkConfig && assign({}, defaultConfig, inkConfig)
    case 'babelConfig':
      return mergeWith(inkConfig, defaultConfig, babelCusomizer)
  }
}

export const getUMDConfig = (): InlineConfig => {
  const {
    name,
    compileConfig: { output },
    entry,
  } = mergeConfig()
  return {
    build: {
      emptyOutDir: true,
      lib: {
        name,
        entry: resolve(CWD, entry),
        fileName: (format) => `${name}.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          dir: output['umd'],
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
}

export const mergeConfig = () =>
  mergeWith(getInkConfig(), getDefaultConfig(), configCustomizer)
