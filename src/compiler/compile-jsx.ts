/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:11
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 14:21:01
 * @FilePath: \ink-cli\src\compiler\compile-jsx.ts
 * @description: 
 */
import { readFile, removeSync, writeFileSync } from 'fs-extra'
import { transformAsync } from '@babel/core'
import { replaceExt } from '../shared/utils'

export const compileJsx = async (filePath: string, options?: Object) => {
  try {
    const content = await readFile(filePath, 'utf-8')
    const res = await transformAsync(content, { filename: filePath, ...options })
    removeSync(filePath)
    writeFileSync(replaceExt(filePath, '.js'), res.code)
  } catch (err) {
    throw err
  }
}