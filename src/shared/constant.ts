/*
 * @author: Archy
 * @Date: 2021-12-14 11:15:56
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 16:45:08
 * @FilePath: \ink-cli\src\shared\constant.ts
 * @description:
 */
import { resolve } from 'path'

export const CWD = process.cwd()

export const SRC_DIR = resolve(CWD, 'src')

export const ES_DIR = resolve(CWD, 'es')

export const LIB_DIR = resolve(CWD, 'lib')

export const UMD_DIR = resolve(CWD, 'umd')

export const CONFIG_DEFAULT_PATH = resolve(CWD, '..', 'config', 'ink.config.json')

export const INK_CONFIG_REG = /ink\.config\.(json|js|ts)/g
