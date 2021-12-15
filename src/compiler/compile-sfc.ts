/*
 * @author: Archy
 * @Date: 2021-12-14 09:58:03
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 10:37:41
 * @FilePath: \ink-cli\src\compiler\compile-sfc.ts
 * @description: 
 */
import hash from 'hash-sum'
import { removeSync, writeFileSync, readFile } from 'fs-extra'
import { replaceExt, easyAppendFileSync } from '../shared/utils'
import { parse, compileTemplate, compileStyle, compileScript } from '@vue/compiler-sfc'
import { compileLess } from './compile-less'
import { parse as path_parse, resolve } from 'path'

const NORMAL_EXPORT_START_RE = /export\s+default\s+{/
const DEFINE_EXPORT_START_RE = /export\s+default\s+defineComponent\s*\(\s*{/
const MIXED_EXPORT_START_RE = /const\s+__default__\s+=\s+defineComponent\s*\(\s*{/

export function injectRender(script: string, render: string): string {
  // vue3 <script>
  if (DEFINE_EXPORT_START_RE.test(script.trim())) {
    return script.trim().replace(
      DEFINE_EXPORT_START_RE,
      `${render}\nexport default defineComponent({
    render,\
      `
    )
  }
  // vue2 <script>
  if (NORMAL_EXPORT_START_RE.test(script.trim())) {
    return script.trim().replace(
      NORMAL_EXPORT_START_RE,
      `${render}\nexport default {
    render,\
      `
    )
  }

  // vue3 <script setup> or mixed <script> 
  if (MIXED_EXPORT_START_RE.test(script.trim())) {
    return script.trim().replace(
      MIXED_EXPORT_START_RE,
      `${render}\nconst __default__ = defineComponent({
        render,\
        `
    )
  }
  return script
}

export async function compileSFC(filePath: string, options?: any) {
  const content: string = await readFile(filePath, 'utf-8')
  const { descriptor } = parse(content, { sourceMap: false })
  const { script, scriptSetup, template, styles, filename } = descriptor
  const id = hash(content)
  const hasScope = styles.some((style) => style.scoped)
  const scopeId = hasScope ? `data-v-${id}` : ''
  if (script || scriptSetup) {
    let { content } = await compileScript(descriptor, { id: scopeId })
    const render =
      template &&
      compileTemplate({
        id,
        source: template.content,
        filename: filePath,
        compilerOptions: {
          scopeId,
        },
      })
    if (render) {
      const { code } = render
      content = injectRender(content, code)
    }
    removeSync(filePath)
    const fileCompiledName = replaceExt(filePath, '.js')
    writeFileSync(fileCompiledName, content, 'utf-8')
    styles.forEach(async (style, index) => {
      const filename = replaceExt(filePath, `.sfc${index ? `_${index}` : ''}.${style.lang || 'css'}`)
      let { code } = compileStyle({
        source: style.content,
        filename,
        id: scopeId,
        scoped: style.scoped,
      })
      writeFileSync(filename, code, 'utf-8')
      style.lang === 'less' && (await compileLess(filename))
      easyAppendFileSync(fileCompiledName, `\nimport '${filename}'`)
    })
  }
}

