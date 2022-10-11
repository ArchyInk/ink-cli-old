/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:11
 * @LastEditors: Archy
 * @LastEditTime: 2022-10-11 14:52:01
 * @FilePath: \ink-cli\src\compiler\compile-script.ts
 * @description:
 */
import { readFile, removeSync, writeFileSync } from 'fs-extra'
import { transformAsync, TransformOptions } from '@babel/core'
import ts from 'typescript'
import {
  handleScriptImportExt,
  replaceExt,
  handleReuireExt,
} from '../shared/utils'
import { get } from 'lodash'
import { mergeConfig } from '../config/config'
export const compileScriptFile = async (filePath: string, options?: TransformOptions & { retainSourceFile?: boolean }) => {
  try {
    let content = await readFile(filePath, 'utf-8')
    content = handleScriptImportExt(content)
    content = handleReuireExt(content)
    const babelConfig = options ? options : get(mergeConfig(), 'compileConfig.babelConfig')
    const res = await transformAsync(content, {
      filename: filePath,
      ...babelConfig,
    })
    !options?.retainSourceFile && removeSync(filePath)
    writeFileSync(replaceExt(filePath, '.js'), res.code)
  } catch (err) {
    throw err
  }
}

export const compileScript = async (content: string, options?: TransformOptions) => {
  try {
    content = handleScriptImportExt(content)
    content = handleReuireExt(content)
    const { code } = await transformAsync(content, options)
    return code
  } catch (err) {
    throw new Error('[ink-cli] compile script error.')
  }
}