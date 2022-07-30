/*
 * @author: Archy
 * @Date: 2021-12-14 09:57:28
 * @LastEditors: Archy
 * @LastEditTime: 2022-07-30 10:16:12
 * @FilePath: \ink-cli\src\compiler\compile-less.ts
 * @description: 
 */
import { readFileSync, writeFileSync, removeSync } from 'fs-extra'
import Less, { render } from 'less'
import { mergeConfig } from '../config/config'
import { replaceExt } from '../shared/utils'
import { get } from 'lodash'

export async function compileLessFile(filePath: string, options?: Less.Options & { deleteSourceFile?: boolean }) {
  const source = readFileSync(filePath, 'utf-8')
  const config: Less.Options = options ? { fileName: filePath, ...options } : { filename: filePath, ...get(mergeConfig(), 'compileConfig.lessOption') }
  const { css } = await render(source, config)
  options?.deleteSourceFile && removeSync(filePath)
  writeFileSync(replaceExt(filePath, '.css'), css, 'utf-8')
}

export async function compileLess(content: string, options?: Less.Options) {
  try {
    const { css } = await render(content, options)
    return css
  } catch (err) {
    throw new Error('[ink-cli] compile less error.')
  }
}