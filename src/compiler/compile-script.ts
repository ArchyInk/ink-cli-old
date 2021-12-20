/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:11
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 23:45:29
 * @FilePath: \ink-cli\src\compiler\compile-script.ts
 * @description:
 */
import { readFile, removeSync, writeFileSync } from 'fs-extra'
import { transformAsync } from '@babel/core'
import {
  handleScriptImportExt,
  replaceExt,
  handleReuireExt,
} from '../shared/utils'
import { get } from 'lodash'
import { mergeConfig } from '../config/config'
export const compileScript = async (filePath: string) => {
  try {
    let content = await readFile(filePath, 'utf-8')
    content = handleScriptImportExt(content)
    content = handleReuireExt(content)
    const babelConfig = get(mergeConfig(), 'compileConfig.babelConfig')
    const res = await transformAsync(content, {
      filename: filePath,
      ...babelConfig,
    })
    removeSync(filePath)
    writeFileSync(replaceExt(filePath, '.js'), res.code)
  } catch (err) {
    throw err
  }
}
