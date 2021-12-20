/*
 * @author: Archy
 * @Date: 2021-12-17 16:07:44
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 15:24:26
 * @FilePath: \ink-cli\src\config\config.ts
 * @description:
 */
import findup from 'findup-sync'
import { CWD, CONFIG_DEFAULT_PATH } from '../shared/constant'
import { getRootPath } from '../shared/utils'
import { readJsonSync } from 'fs-extra'
import { mergeWith, assign } from 'lodash'
export const getInkConfig = () => {
  let inkConfig: any = {}
  const inkConfigPath = findup('ink.config.(js|ts)')
  inkConfig = require(inkConfigPath)
  if (inkConfig['default']) inkConfig = inkConfig.default
  return inkConfig
}

export const getDefaultConfig = () => {
  let defaultConfig: any = {}
  defaultConfig = require(CONFIG_DEFAULT_PATH)
  if (defaultConfig['default']) defaultConfig = defaultConfig.default
  return defaultConfig
}

export const mergeConfig = () => mergeWith(getInkConfig(), getDefaultConfig(), configCustomizer)

const configCustomizer = (inkConfig, defaultConfig, key) => {
  if (key === 'include' || key === 'exclude' || key === 'target') {
    return inkConfig ? inkConfig : defaultConfig
  }
  if (key === 'output') {
    return inkConfig && assign({}, defaultConfig, inkConfig)
  }
  console.log(defaultConfig);
}
