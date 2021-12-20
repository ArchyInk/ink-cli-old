/*
 * @author: Archy
 * @Date: 2021-12-14 11:15:56
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 16:33:59
 * @FilePath: \ink-cli\src\shared\constant.ts
 * @description:
 */
import { resolve } from 'path'
import { mergeConfig } from '../config/config'

export const CWD = process.cwd()

export const SRC_DIR = resolve(CWD, 'src')

export const ES_DIR = resolve(CWD, 'es')

export const LIB_DIR = resolve(CWD, 'lib')

export const UMD_DIR = resolve(CWD, 'umd')

export const CONFIG_DEFAULT_PATH = resolve(
  __dirname,
  '..',
  'config',
  'ink.default.config.js'
)

export const INK_CONFIG_REG = /ink\.config\.(json|js|ts)/g



