/*
 * @author: Archy
 * @Date: 2021-12-17 16:07:44
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 20:46:53
 * @FilePath: \ink-cli\src\config\config.ts
 * @description:
 */
import findup from 'findup-sync'
import { CWD, CONFIG_DEFAULT_PATH } from '../shared/constant'
import { getRootPath } from '../shared/utils'
import { readJsonSync } from 'fs-extra'
import { merge } from 'lodash'

export const getInkConfig = () => {
  let inkConfig: any = {}
  const inkConfigPath = findup('ink.config.(js|ts)')
  inkConfig = require(inkConfigPath)
  if (inkConfig['default']) inkConfig = inkConfig.require
}

export const getDefaultConfig = () => require(CONFIG_DEFAULT_PATH)

export const mergeConfig = () => merge(getInkConfig(), getDefaultConfig())
