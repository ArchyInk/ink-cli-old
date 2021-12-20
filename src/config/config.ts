/*
 * @author: Archy
 * @Date: 2021-12-17 16:07:44
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 20:56:06
 * @FilePath: \ink-cli\src\config\config.ts
 * @description:
 */
import findup from 'findup-sync'
import { CONFIG_DEFAULT_PATH } from '../shared/constant'
import { mergeWith, assign, isArray } from 'lodash'
export const getInkConfig = () => {
  let inkConfig: any = {}
  const inkConfigPath = findup('ink.config.(js|ts)')
  delete require.cache[require.resolve(inkConfigPath)]
  inkConfig = require(inkConfigPath)
  if (inkConfig['default']) inkConfig = inkConfig.default
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

export const mergeConfig = () =>
  mergeWith(getInkConfig(), getDefaultConfig(), configCustomizer)
