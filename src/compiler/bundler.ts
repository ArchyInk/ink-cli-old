/*
 * @author: Archy
 * @Date: 2021-12-14 09:59:40
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 00:14:41
 * @FilePath: \ink-cli\src\compiler\bundler.ts
 * @description:
 */
import { resolve, parse } from 'path'
import { CWD, ES_DIR } from '../shared/constant'
import {
  removeDirs,
  isSFC,
  isJsx,
  isDir,
  isLess,
  isFile,
} from '../shared/utils'
import { readdir, copy, pathExistsSync, rename } from 'fs-extra'
import { compileJsx } from './compile-jsx'
import { compileLess } from './compile-less'
import { compileSFC } from './compile-sfc'

export type CompileOpt = {
  jsxOpt: any
  sfcOpt: any
  lessOpt: any
}

export async function compileDir(dir: string, options?: CompileOpt) {
  const dirs = await readdir(dir)
  await Promise.all(
    dirs.map((filename) => {
      const file = resolve(dir, filename)
      return compileFile(file, options)
    })
  )
}

export async function compileSingFile(filePath, options?: CompileOpt) {
  const { base, dir } = parse(filePath)
  const copyPath = resolve(dir, '_' + base)
  await copy(filePath, copyPath)
  pathExistsSync(filePath) && (await compileFile(filePath, options))
  await rename(copyPath, resolve(dir, base))
}

export async function compileFile(file: string, options?: CompileOpt) {
  isSFC(file) && (await compileSFC(file, options?.sfcOpt))
  isJsx(file) && (await compileJsx(file, options?.jsxOpt))
  isLess(file) && (await compileLess(file, options?.lessOpt))
  isDir(file) && (await compileDir(file, options))
}

export async function preCompile(path: string, options?: CompileOpt) {
  const fullPath = resolve(CWD, path)
  if (isFile(fullPath)) {
    await compileSingFile(fullPath,options)
  } else if (isDir(fullPath)) {
    await removeDirs([ES_DIR])
    await copy(fullPath, ES_DIR)
    const dist = ES_DIR
    await compileDir(dist, options)
  }
}
