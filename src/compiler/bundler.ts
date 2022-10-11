/*
 * @author: Archy
 * @Date: 2021-12-14 09:59:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-10-11 14:47:19
 * @FilePath: \ink-cli\src\compiler\bundler.ts
 * @description:
 */
import { resolve, parse } from 'path'
import { CWD } from '../shared/constant'
import { isMatch } from 'nanomatch'
import {
  removeDir,
  isSFC,
  isJsx,
  isDir,
  isLess,
  isFile,
  isJs,
  isMD,
  normalizePath,
  getTargetDir,
  isTsx,
  isTs,
} from '../shared/utils'
import { readdir, copy, pathExistsSync, rename } from 'fs-extra'
import { compileScriptFile } from './compile-script'
import { compileLessFile } from './compile-less'
import { compileSFCFile } from './compile-sfc'
import { compileMdFile } from './compile-md'
import { getUMDConfig, mergeConfig } from '../config/config'
import { build } from 'vite'


/**
 * @description: 编译文件夹
 * @param {string} dir
 * @param {CompileOpt} options
 * @return {*}
 */
export async function compileDir(dir: string) {
  const dirs = await readdir(dir)
  await Promise.all(
    dirs.map((filename) => {
      const file = resolve(dir, filename)
      return compileFile(file)
    })
  )
}

/**
 * @description: 编译单个文件
 * @param {*} filePath
 * @param {CompileOpt} options
 * @return {*}
 */
export async function compileSingFile(filePath) {
  const { base, dir } = parse(filePath)
  const copyPath = resolve(dir, '_' + base)
  await copy(filePath, copyPath)
  pathExistsSync(filePath) && (await compileFile(filePath))
  await rename(copyPath, resolve(dir, base))
}

/**
 * @description: 编译文件
 * @param {string} file
 * @param {CompileOpt} options
 * @return {*}
 */
export async function compileFile(file: string) {
  isSFC(file) && (await compileSFCFile(file))
    ; (isJsx(file) || isTsx(file) || isJs(file) || isTs(file)) &&
      (await compileScriptFile(file))
  isLess(file) && (await compileLessFile(file))
  isDir(file) && (await compileDir(file))
  isMD(file) && (await compileMdFile(file))
}

export async function umdCompile() {
  return new Promise<void>((resolve, reject) => {
    build(getUMDConfig())
      .then(() => resolve())
      .catch(reject)
  })
}

/**
 * @description: 编译预操作
 * @param {string} path
 * @param {CompileOpt} options
 * @return {*}
 */
export async function preCompile() {
  const target = process.env.COMPILE_TARGET
  if (target === 'umd') {
    // umd由vite处理
    umdCompile()
    return
  }
  const {
    compileConfig: { include, exclude },
  } = mergeConfig()
  const targetDir = getTargetDir()
  const singleDir = include.length === 1
  await removeDir(targetDir)
  await Promise.all(
    include.map(async (path) => {
      const fullPath = resolve(CWD, path)
      if (isFile(fullPath)) {
        // 单个文件的编译结果在文件原位置
        return compileSingFile(fullPath)
      } else if (isDir(fullPath)) {
        // 文件夹的编译结果在配置目标文件夹中
        let targetPath = targetDir
        if (!singleDir) {
          const { base } = parse(fullPath)
          targetPath = resolve(targetDir, base)
        }
        await copy(fullPath, targetPath, {
          filter: (src, dest) => {
            const _exclude = exclude.map((_) => normalizePath(resolve(CWD, _)))
            const _src = normalizePath(src)
            return !isMatch(_src, _exclude)
          },
        })
        return compileDir(targetPath)
      }
    })
  )
}
