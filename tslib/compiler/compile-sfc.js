"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSFC = exports.injectRender = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 09:58:03
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 11:21:38
 * @FilePath: \ink-cli\src\compiler\compile-sfc.ts
 * @description:
 */
const hash_sum_1 = __importDefault(require("hash-sum"));
const fs_extra_1 = require("fs-extra");
const utils_1 = require("../shared/utils");
const compiler_sfc_1 = require("@vue/compiler-sfc");
const compile_less_1 = require("./compile-less");
const path_1 = require("path");
// vue2 export default 和 vue3 <script setup>
const NORMAL_EXPORT_DEFAULT_REG = /export\s+default\s+{/;
// vue3 <script>
const DEFINE_EXPORT_DEFAULT_REG = /export\s+default\s+defineComponent\s*\(\s*{/;
// vue3 <script> and <script setup>
const MIXED_EXPORT_DEFAULT_REG = /const\s+__default__\s+=\s+defineComponent\s*\(\s*{/;
/**
 * @description: inject transformed render result and scopeId into script
 * @param {string} script
 * @param {string} render
 * @return {*}
 */
function injectRender(script, render, scopeId) {
    // vue3 <script>
    if (DEFINE_EXPORT_DEFAULT_REG.test(script.trim())) {
        return script.trim().replace(DEFINE_EXPORT_DEFAULT_REG, `${render}\nexport default defineComponent({
  render,\n
  __scopeId:'${scopeId}',\n
      `);
    }
    // vue2 <script> and vue3 <script setup>
    if (NORMAL_EXPORT_DEFAULT_REG.test(script.trim())) {
        return script.trim().replace(NORMAL_EXPORT_DEFAULT_REG, `${render}\nexport default {
  render,\n
  __scopeId:'${scopeId}',
      `);
    }
    // vue3 mixed <script> and <script setup>
    if (MIXED_EXPORT_DEFAULT_REG.test(script.trim())) {
        return script.trim().replace(MIXED_EXPORT_DEFAULT_REG, `${render}\nconst __default__ = defineComponent({
  render,\n
  __scopeId:'${scopeId}',
        `);
    }
    return script;
}
exports.injectRender = injectRender;
/**
 * @description: compile .vue file
 * @param {string} filePath
 * @param {any} options
 * @return {*}
 */
async function compileSFC(filePath, options) {
    const content = await (0, fs_extra_1.readFile)(filePath, 'utf-8');
    const { descriptor } = (0, compiler_sfc_1.parse)(content, { sourceMap: false });
    const { script, scriptSetup, template, styles } = descriptor;
    const id = (0, hash_sum_1.default)(content);
    (0, fs_extra_1.writeFileSync)((0, path_1.resolve)(process.cwd(), 'parse'), JSON.stringify(descriptor), 'utf-8');
    const hasScope = styles.some((style) => style.scoped);
    const scopeId = hasScope ? `data-v-${id}` : '';
    if (script || scriptSetup) {
        let { content } = await (0, compiler_sfc_1.compileScript)(descriptor, Object.assign({ id: scopeId }, options?.scriptOptions));
        const render = template &&
            (0, compiler_sfc_1.compileTemplate)(Object.assign({
                id,
                source: template.content,
                filename: filePath,
                scoped: hasScope,
            }, options?.templateOptions));
        if (render) {
            const { code } = render;
            content = injectRender(content, code, scopeId);
        }
        (0, fs_extra_1.removeSync)(filePath);
        const fileCompiledName = (0, utils_1.replaceExt)(filePath, '.js');
        styles.forEach(async (style, index) => {
            const { dir, base } = (0, path_1.parse)(filePath);
            const filename = (0, utils_1.replaceExt)(base, `.sfc${index ? `_${index}` : ''}.css`);
            let { code } = (0, compiler_sfc_1.compileStyle)(Object.assign({
                source: style.content,
                filename,
                id: scopeId,
                scoped: style.scoped,
            }, options?.styleOptions));
            // code = handleStyleImportExt(code)
            (0, fs_extra_1.writeFileSync)((0, path_1.resolve)(dir, filename), code, 'utf-8');
            content = `import './${filename}'\n` + content;
            style.lang === 'less' && (await (0, compile_less_1.compileLess)((0, path_1.resolve)(dir, filename)));
        });
        content = (0, utils_1.handleScriptImportExt)(content);
        (0, fs_extra_1.writeFileSync)(fileCompiledName, content, 'utf-8');
    }
}
exports.compileSFC = compileSFC;
