"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSFC = exports.injectRender = void 0;
const tslib_1 = require("tslib");
/*
 * @author: Archy
 * @Date: 2021-12-14 09:58:03
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 10:37:41
 * @FilePath: \ink-cli\src\compiler\compile-sfc.ts
 * @description:
 */
const hash_sum_1 = (0, tslib_1.__importDefault)(require("hash-sum"));
const fs_extra_1 = require("fs-extra");
const utils_1 = require("../shared/utils");
const compiler_sfc_1 = require("@vue/compiler-sfc");
const compile_less_1 = require("./compile-less");
const NORMAL_EXPORT_START_RE = /export\s+default\s+{/;
const DEFINE_EXPORT_START_RE = /export\s+default\s+defineComponent\s*\(\s*{/;
const MIXED_EXPORT_START_RE = /const\s+__default__\s+=\s+defineComponent\s*\(\s*{/;
function injectRender(script, render) {
    // vue3 <script>
    if (DEFINE_EXPORT_START_RE.test(script.trim())) {
        return script.trim().replace(DEFINE_EXPORT_START_RE, `${render}\nexport default defineComponent({
    render,\
      `);
    }
    // vue2 <script>
    if (NORMAL_EXPORT_START_RE.test(script.trim())) {
        return script.trim().replace(NORMAL_EXPORT_START_RE, `${render}\nexport default {
    render,\
      `);
    }
    // vue3 <script setup> or mixed <script> 
    if (MIXED_EXPORT_START_RE.test(script.trim())) {
        return script.trim().replace(MIXED_EXPORT_START_RE, `${render}\nconst __default__ = defineComponent({
        render,\
        `);
    }
    return script;
}
exports.injectRender = injectRender;
async function compileSFC(filePath, options) {
    const content = await (0, fs_extra_1.readFile)(filePath, 'utf-8');
    const { descriptor } = (0, compiler_sfc_1.parse)(content, { sourceMap: false });
    const { script, scriptSetup, template, styles, filename } = descriptor;
    const id = (0, hash_sum_1.default)(content);
    const hasScope = styles.some((style) => style.scoped);
    const scopeId = hasScope ? `data-v-${id}` : '';
    if (script || scriptSetup) {
        let { content } = await (0, compiler_sfc_1.compileScript)(descriptor, { id: scopeId });
        const render = template &&
            (0, compiler_sfc_1.compileTemplate)({
                id,
                source: template.content,
                filename: filePath,
                compilerOptions: {
                    scopeId,
                },
            });
        if (render) {
            const { code } = render;
            content = injectRender(content, code);
        }
        (0, fs_extra_1.removeSync)(filePath);
        const fileCompiledName = (0, utils_1.replaceExt)(filePath, '.js');
        (0, fs_extra_1.writeFileSync)(fileCompiledName, content, 'utf-8');
        styles.forEach(async (style, index) => {
            const filename = (0, utils_1.replaceExt)(filePath, `.sfc${index ? `_${index}` : ''}.${style.lang || 'css'}`);
            let { code } = (0, compiler_sfc_1.compileStyle)({
                source: style.content,
                filename,
                id: scopeId,
                scoped: style.scoped,
            });
            (0, fs_extra_1.writeFileSync)(filename, code, 'utf-8');
            style.lang === 'less' && (await (0, compile_less_1.compileLess)(filename));
            (0, utils_1.easyAppendFileSync)(fileCompiledName, `\nimport '${filename}'`);
        });
    }
}
exports.compileSFC = compileSFC;
