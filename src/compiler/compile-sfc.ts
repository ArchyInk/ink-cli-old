/*
 * @author: Archy
 * @Date: 2021-12-14 09:58:03
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-16 13:56:54
 * @FilePath: \ink-cli\src\compiler\compile-sfc.ts
 * @description:
 */
import hash from 'hash-sum'
import { removeSync, writeFileSync, readFile } from 'fs-extra'
import { replaceExt, handleScriptImportExt, handleStyleImportExt } from '../shared/utils'
import {
  parse,
  compileTemplate,
  compileStyle,
  compileScript,
  SFCScriptCompileOptions,
  SFCTemplateCompileOptions,
  SFCStyleCompileOptions,
} from '@vue/compiler-sfc'
import { get } from 'lodash'
import { compileLess, compileLessFile } from './compile-less'
import { parse as path_parse, resolve } from 'path'
import { mergeConfig } from '../config/config'

// vue2 export default 和 vue3 <script setup>
const NORMAL_EXPORT_DEFAULT_REG = /export\s+default\s+{/
// vue3 <script>
const DEFINE_EXPORT_DEFAULT_REG = /export\s+default\s+defineComponent\s*\(\s*{/
// vue3 <script> and <script setup>
const MIXED_EXPORT_DEFAULT_REG =
  /const\s+__default__\s+=\s+defineComponent\s*\(\s*{/

/**
 * @description: inject transformed render result and scopeId into script
 * @param {string} script
 * @param {string} render
 * @return {*}
 */
export function injectRender(
  script: string,
  render: string,
  scopeId: string
): string {
  // vue3 <script>
  if (DEFINE_EXPORT_DEFAULT_REG.test(script.trim())) {
    return script.trim().replace(
      DEFINE_EXPORT_DEFAULT_REG,
      `${render}\nexport default defineComponent({
  render,\n
  __scopeId:'${scopeId}',\n
      `
    )
  }
  // vue2 <script> and vue3 <script setup>
  if (NORMAL_EXPORT_DEFAULT_REG.test(script.trim())) {
    return script.trim().replace(
      NORMAL_EXPORT_DEFAULT_REG,
      `${render}\nexport default {
  render,\n
  __scopeId:'${scopeId}',
      `
    )
  }

  // vue3 mixed <script> and <script setup>
  if (MIXED_EXPORT_DEFAULT_REG.test(script.trim())) {
    return script.trim().replace(
      MIXED_EXPORT_DEFAULT_REG,
      `${render}\nconst __default__ = defineComponent({
  render,\n
  __scopeId:'${scopeId}',
        `
    )
  }
  return script
}

/**
 * @description: compile .vue file
 * @param {string} filePath
 * @param {any} options
 * @return {*}
 */
export async function compileSFCFile(filePath: string, options?: { retainSourceFile?: boolean, scriptCompileOptions?: SFCScriptCompileOptions, templateCompileOptions?: SFCTemplateCompileOptions, styleCompileOptions?: SFCStyleCompileOptions }) {
  const content: string = await readFile(filePath, 'utf-8')
  const { descriptor } = parse(content, { sourceMap: false })
  const { script, scriptSetup, template, styles } = descriptor
  const id = hash(content)
  const hasScope = styles.some((style) => style.scoped)
  const scopeId = hasScope ? `data-v-${id}` : ''
  if (script || scriptSetup) {
    let { content } = compileScript(
      descriptor,
      Object.assign({ id: scopeId }, options?.scriptCompileOptions ? options?.scriptCompileOptions : get(mergeConfig(), 'compileConfig.sfcOption.script'))
    )
    const render =
      template &&
      compileTemplate(
        Object.assign(
          {
            id,
            source: template.content,
            filename: filePath,
            scopeId: hasScope,
          },
          options?.templateCompileOptions ? options?.templateCompileOptions : get(mergeConfig(), 'compileConfig.sfcOption.template')
        )
      )
    if (render) {
      const { code } = render
      content = injectRender(content, code, scopeId)
    }
    !options?.retainSourceFile && removeSync(filePath)
    const fileCompiledName = replaceExt(filePath, '.js')
    styles.forEach(async (style, index) => {
      const { dir, base } = path_parse(filePath)
      const filename = replaceExt(base, `.sfc${index ? `_${index}` : ''}.css`)
      let { code } = compileStyle(
        Object.assign(
          {
            source: style.content,
            filename,
            id: scopeId,
            scoped: style.scoped,
          },
          options?.styleCompileOptions ? options?.styleCompileOptions : get(mergeConfig(), 'compileConfig.sfcOption.style')
        )
      )
      writeFileSync(resolve(dir, filename), code, 'utf-8')
      content = `import './${filename}'\n` + content
      style.lang === 'less' && (await compileLessFile(resolve(dir, filename)))
    })
    content = handleScriptImportExt(content)
    writeFileSync(fileCompiledName, content, 'utf-8')
  }
}

export const compileSFC = async (content: string, options?: { scriptCompileOptions?: SFCScriptCompileOptions, templateCompileOptions?: SFCTemplateCompileOptions }) => {
  const { descriptor } = parse(content, { sourceMap: false })
  const { script, scriptSetup, template, styles } = descriptor
  const id = hash(content)
  const hasScope = styles.some((style) => style.scoped)
  const scopeId = hasScope ? `data-v-${id}` : ''
  let result = ''
  if (script || scriptSetup) {
    let { content } = compileScript(descriptor, Object.assign({ id: scopeId, ...options?.scriptCompileOptions }))
    const render = template && compileTemplate(Object.assign({
      id,
      source: template.content,
      scopeId: hasScope
    }, options?.templateCompileOptions))
    if (render) {
      content = injectRender(content, render.code, scopeId)
    }
    result = handleScriptImportExt(content)
  }
  return result
}