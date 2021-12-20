/*
 * @author: Archy
 * @Date: 2021-12-16 16:47:27
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 23:38:13
 * @FilePath: \ink-cli\src\compiler\compile-md.ts
 * @description:
 */
import { marked } from 'marked'
import { readFile, writeFileSync } from 'fs-extra'
import { replaceExt } from '../shared/utils'
export const compileMd = async (filePath: string) => {
  try {
    let content = await readFile(filePath, 'utf-8')
    content = marked.parse(content)
    writeFileSync(replaceExt(filePath, '.html'), content)
  } catch (err) {
    throw err
  }
}
