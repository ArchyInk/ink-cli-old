/*
 * @author: Archy
 * @Date: 2021-12-14 11:26:47
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 16:47:24
 * @FilePath: \ink-cli\src\shared\utils.ts
 * @description:
 */
import { dirname, extname } from 'path'
import {
  pathExistsSync,
  lstatSync,
  remove,
  readFileSync,
  appendFileSync,
} from 'fs-extra'
import findUp from 'find-up'

export const IMPORT_VUE_REG =
  /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.vue(\s*['"])/g

export const IMPORT_JSX_REG =
  /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.jsx(\s*['"])/g

export const IMPORT_TSX_REG =
  /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.tsx(\s*['"])/g

export const IMPORT_TS_REG =
  /(import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.ts(\s*['"])/g

export const IMPORT_LESS_REG = /(import\s+['"]\s*.+)\.less(\s*['"])/g

export const AT_IMPORT_LESS_REG =
  /(@import\s+['"]\s*\.{1,2}\/.+)\.less(\s*['"];)/g

const jsReplacer = (_: string, p1: string, p2: string): string =>
  `${p1}.js${p2}`

const cssReplacer = (_: string, p1: string, p2: string): string =>
  `${p1}.css${p2}`

export const replaceImportVueExt = (content: string): string =>
  content.replace(IMPORT_VUE_REG, jsReplacer)

export const replaceImportJsxExt = (content: string): string =>
  content.replace(IMPORT_JSX_REG, jsReplacer)

export const replaceImportTsxExt = (content: string): string =>
  content.replace(IMPORT_TSX_REG, jsReplacer)

export const replaceImportTsExt = (content: string): string =>
  content.replace(IMPORT_TS_REG, jsReplacer)

export const replaceImportLessExt = (content: string): string =>
  content.replace(IMPORT_LESS_REG, cssReplacer)

export const replaceAtImportLessExt = (content: string): string =>
  content.replace(AT_IMPORT_LESS_REG, cssReplacer)

export const handleScriptImportExt = (content: string) => {
  content = replaceImportVueExt(content)
  content = replaceImportJsxExt(content)
  content = replaceImportTsxExt(content)
  content = replaceImportTsExt(content)
  content = replaceImportLessExt(content)
  return content
}

export const handleStyleImportExt = (content: string) => {
  content = replaceAtImportLessExt(content)
  return content
}

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

export const normalizePath = (path) => path.replace(/\\/g, '/')

export const replaceExt = (filename: string, ext: string): string =>
  filename.replace(extname(filename), ext)

export const removeDirs = (dirs: Array<string>) =>
  Promise.all(dirs.map((dir) => remove(dir)))

export const removeDir = (dir: string) => remove(dir)

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

export const getRootPath = async () => {
  const pkg = await findUp('package.json')
  return pkg && dirname(pkg)
}