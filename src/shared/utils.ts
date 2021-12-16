/*
 * @author: Archy
 * @Date: 2021-12-14 11:26:47
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 16:46:58
 * @FilePath: \ink-cli\src\shared\utils.ts
 * @description:
 */
import { extname } from 'path'
import {
  pathExistsSync,
  lstatSync,
  remove,
  readFileSync,
  appendFileSync,
} from 'fs-extra'

export const checkType = (filename: string, ext: string): boolean => {
  if (isDir(filename)) return
  if (!/\.\w+$/.test(filename)) {
    throw new Error(
      `[ink-cli] Filename should be end with '.[string]' like '.md' to check filenametype, got '${filename}'`
    )
  }
  return pathExistsSync(filename) && extname(filename) === ext
}

export const isMD = (filename: string): boolean => checkType(filename, '.md')
export const isSFC = (filename: string): boolean => checkType(filename, '.vue')
export const isJsx = (filename: string): boolean => checkType(filename, '.jsx')
export const isTsx = (filename: string): boolean => checkType(filename, '.tsx')
export const isJs = (filename: string): boolean => checkType(filename, '.js')
export const isLess = (filename: string): boolean =>
  checkType(filename, '.less')

export const isDir = (filename: string): boolean =>
  pathExistsSync(filename) && lstatSync(filename).isDirectory()
export const isFile = (filename: string): boolean =>
  pathExistsSync(filename) && lstatSync(filename).isFile()

export const replaceExt = (filename: string, ext: string): string =>
  filename.replace(extname(filename), ext)

export const removeDirs = (dirs: Array<string>) =>
  Promise.all(dirs.map((dir) => remove(dir)))

export const easyReadFileSync = (filename: string) => {
  if (pathExistsSync(filename)) {
    const res = readFileSync(filename, 'utf-8')
    return res
  }
}

export const easyAppendFileSync = (filename: string, content: string) => {
  const c = easyReadFileSync(filename)
  c.includes(content) || appendFileSync(filename, content)
}
