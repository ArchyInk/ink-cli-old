/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:28
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 11:24:22
 * @FilePath: \ink-cli\src\compiler\compile-less.ts
 * @description: 
 */
import { readFileSync, writeFileSync, removeSync } from 'fs-extra'
import { render } from 'less'
import { replaceExt } from '../shared/utils'

export async function compileLess(filePath: string, options?: Object) {
  const source = readFileSync(filePath, 'utf-8')
  const { css } = await render(source, { filename: filePath, ...options })
  // 删除less源文件会导致后面的less文件引入已经编译后的less文件时无法找到文件,等编译后在删除less?
  // removeSync(filePath)
  writeFileSync(replaceExt(filePath, '.css'), css, 'utf-8')
}
