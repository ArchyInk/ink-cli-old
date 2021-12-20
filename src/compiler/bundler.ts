/*
 * @author: Archy
 * @Date: 2021-12-14 09:59:40
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 15:07:07
 * @FilePath: \ink-cli\src\compiler\bundler.ts
 * @description:
 */
import { resolve, parse } from 'path'
import { CWD } from '../shared/constant'
import {
  removeDirs,
  isSFC,
  isJsx,
  isDir,
  isLess,
  isFile,
  isJs,
  normalizePath,
} from '../shared/utils'
import { readdir, copy, pathExistsSync, rename } from 'fs-extra'
import { compileJsx } from './compile-jsx'
import { compileLess } from './compile-less'
import { compileSFC } from './compile-sfc'
import { compileJs } from './compile-js'
import type { CompileOpt } from '../types/compiler'
import { mergeConfig } from '../config/config'

/**
 * @description: 编译文件夹
 * @param {string} dir
 * @param {CompileOpt} options
 * @return {*}
 */
export async function compileDir(dir: string, targetDirs) {
  console.log(parse(dir));
  // for (let targetDir of targetDirs) {
  //   await copy(dir, targetDir.map(_=>resolve(_,)))
  // }
  // const dirs = await readdir(dir)
  // await Promise.all(
  //   dirs.map((filename) => {
  //     const file = resolve(dir, filename)
  //     return compileFile(file, options)
  //   })
  // )
}

/**
 * @description: 编译单个文件
 * @param {*} filePath
 * @param {CompileOpt} options
 * @return {*}
 */
export async function compileSingFile(filePath, options?: CompileOpt) {
  const { base, dir } = parse(filePath)
  const copyPath = resolve(dir, '_' + base)
  await copy(filePath, copyPath)
  pathExistsSync(filePath) && (await compileFile(filePath, options))
  await rename(copyPath, resolve(dir, base))
}

/**
 * @description: 编译文件
 * @param {string} file
 * @param {CompileOpt} options
 * @return {*}
 */
export async function compileFile(file: string, options?: CompileOpt) {
  const { sfcOptions, babelConfig, lessOptions } = options
  isSFC(file) && (await compileSFC(file, sfcOptions))
  // isJs(file) && (await compileJs(file, babelOptions))
  isJsx(file) && (await compileJsx(file, babelConfig))
  isLess(file) && (await compileLess(file, lessOptions))
  isDir(file) && (await compileDir(file, options))
}

export async function umdCompile() {
  console.log('umd compile');
}

/**
 * @description: 编译预操作
 * @param {string} path
 * @param {CompileOpt} options
 * @return {*}
 */
export async function preCompile() {
  // if (process.env.COMPILE_TARGET === 'umd') {
  //   // umd由vite处理
  //   umdCompile()
  //   return
  // }
  // const { include, output, target } = mergeConfig()
  // const targetDirs = target.map(_ => resolve(CWD, output[_]))
  console.log(mergeConfig());
  // await removeDirs(targetDirs)
  // include.forEach(async path => {
  //   const fullPath = resolve(CWD, path)
  //   if (isFile(fullPath)) {
  //     // 单个文件的编译结果在文件原位置
  //     await compileSingFile(fullPath)
  //   } else if (isDir(fullPath)) {
  //     // 文件夹的编译结果在配置目标文件夹中
  //     await compileDir(fullPath, targetDirs)
  //   }
  // })
}
