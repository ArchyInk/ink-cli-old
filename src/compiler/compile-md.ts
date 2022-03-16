/*
 * @author: Archy
 * @Date: 2021-12-16 16:47:27
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-16 10:13:22
 * @FilePath: \ink-cli\src\compiler\compile-md.ts
 * @description:
 */
import { marked } from 'marked'
import { readFile, writeFileSync } from 'fs-extra'
import { replaceExt } from '../shared/utils'
export async function compileMdFile(filePath: string) {
  try {
    let content = await readFile(filePath, 'utf-8')
    content = marked.parse(content)
    writeFileSync(replaceExt(filePath, '.html'), content)
  } catch (err) {
    throw err
  }
}

export async function compileMd(content: string) {
  try {
    const _content = await marked.parse(content)
    return _content
  } catch (err) {
    throw new Error('[ink-cli] compile markdown error.')
  }
}