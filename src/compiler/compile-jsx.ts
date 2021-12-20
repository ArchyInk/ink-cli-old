/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:11
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 21:46:40
 * @FilePath: \ink-cli\src\compiler\compile-jsx.ts
 * @description: 
 */
import { readFile, removeSync, writeFileSync } from 'fs-extra'
import { transformAsync } from '@babel/core'
import { replaceExt } from '../shared/utils'
import { get } from 'lodash'
import { mergeConfig } from '../config/config'
export const compileJsx = async (filePath: string) => {
  try {
    const content = await readFile(filePath, 'utf-8')
    const babelConfig = get(mergeConfig(), 'compileConfig.babelConfig')
    const res = await transformAsync(content, { filename: filePath, ...babelConfig })
    removeSync(filePath)
    writeFileSync(replaceExt(filePath, '.js'), res.code)
  } catch (err) {
    throw err
  }
}