/*
 * @author: Archy
 * @Date: 2021-12-14 11:26:47
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-14 20:52:27
 * @FilePath: \ink-cli\src\shared\utils.ts
 * @description: 
 */
import { extname } from 'path'
import { pathExistsSync, lstatSync, remove } from 'fs-extra'


export const checkType = (file: string, ext: string): boolean => {
  if (isDir(file)) return
  if (!/\.\w+$/.test(file)) {
    throw new Error(`[ink-cli] Filename should be end with '.[string]' like '.md' to check filetype, got '${file}'`)
  }
  return extname(file) === ext
}

export const isMD = (file: string): boolean => checkType(file, '.md')
export const isSFC = (file: string): boolean => checkType(file, '.vue')
export const isJsx = (file: string): boolean => checkType(file, '.jsx')
export const isTsx = (file: string): boolean => checkType(file, '.tsx')
export const isDTS = (file: string): boolean => checkType(file, '.d.ts')
export const isLess = (file: string): boolean => checkType(file, '.less')

export const isDir = (file: string): boolean => pathExistsSync(file) && lstatSync(file).isDirectory()
export const replaceExt = (file: string, ext: string): string => file.replace(extname(file), ext)

export const removeDirs = (dirs: Array<string>) => Promise.all(dirs.map((dir) => remove(dir)))
