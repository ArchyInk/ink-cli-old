/*
 * @author: Archy
 * @Date: 2021-12-14 09:59:40
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-14 21:54:25
 * @FilePath: \ink-cli\src\compiler\bundler.ts
 * @description: 
 */
import { resolve } from 'path'
import { CWD, ES_DIR } from '../shared/constant'
import { removeDirs, isSFC, isJsx, isDir, isLess } from '../shared/utils'
import { readdir, copy } from 'fs-extra'
import { compileJsx } from './compile-jsx'
import { compileLess } from './compile-less'
import { compileSFC } from './compile-sfc'

export type CompileDirOpt = {
  jsxOpt: any,
  sfcOpt: any,
  lessOpt: any,
}

export async function compileDir(dir: string, options?: CompileDirOpt) {
  const dirs = await readdir(dir)
  await Promise.all(
    dirs.map((filename) => {
      const file = resolve(dir, filename)
      return compileFile(file, options)
    })
  )
}

export async function compileFile(file: string, options?: CompileDirOpt) {
  isSFC(file) && (await compileSFC(file, options.sfcOpt))
  isJsx(file) && (await compileJsx(file, options?.jsxOpt))
  isLess(file) && (await compileLess(file, options?.lessOpt))
  isDir(file) && (await compileDir(file, options))
}

export async function preCompileDir(dir: string, options?: CompileDirOpt) {
  const fullDir = resolve(CWD, dir)
  await removeDirs([ES_DIR])
  await copy(fullDir, ES_DIR)
  const dist = ES_DIR
  await compileDir(dist, options)
}