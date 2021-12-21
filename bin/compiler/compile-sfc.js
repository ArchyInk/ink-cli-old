"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSFC = exports.injectRender = void 0;
/*
 * @author: Archy
 * @Date: 2021-12-14 09:58:03
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 16:51:40
 * @FilePath: \ink-cli\src\compiler\compile-sfc.ts
 * @description:
 */
var hash_sum_1 = __importDefault(require("hash-sum"));
var fs_extra_1 = require("fs-extra");
var utils_1 = require("../shared/utils");
var compiler_sfc_1 = require("@vue/compiler-sfc");
var lodash_1 = require("lodash");
var compile_less_1 = require("./compile-less");
var path_1 = require("path");
var config_1 = require("../config/config");
// vue2 export default 和 vue3 <script setup>
var NORMAL_EXPORT_DEFAULT_REG = /export\s+default\s+{/;
// vue3 <script>
var DEFINE_EXPORT_DEFAULT_REG = /export\s+default\s+defineComponent\s*\(\s*{/;
// vue3 <script> and <script setup>
var MIXED_EXPORT_DEFAULT_REG = /const\s+__default__\s+=\s+defineComponent\s*\(\s*{/;
/**
 * @description: inject transformed render result and scopeId into script
 * @param {string} script
 * @param {string} render
 * @return {*}
 */
function injectRender(script, render, scopeId) {
    // vue3 <script>
    if (DEFINE_EXPORT_DEFAULT_REG.test(script.trim())) {
        return script.trim().replace(DEFINE_EXPORT_DEFAULT_REG, "".concat(render, "\nexport default defineComponent({\n  render,\n\n  __scopeId:'").concat(scopeId, "',\n\n      "));
    }
    // vue2 <script> and vue3 <script setup>
    if (NORMAL_EXPORT_DEFAULT_REG.test(script.trim())) {
        return script.trim().replace(NORMAL_EXPORT_DEFAULT_REG, "".concat(render, "\nexport default {\n  render,\n\n  __scopeId:'").concat(scopeId, "',\n      "));
    }
    // vue3 mixed <script> and <script setup>
    if (MIXED_EXPORT_DEFAULT_REG.test(script.trim())) {
        return script.trim().replace(MIXED_EXPORT_DEFAULT_REG, "".concat(render, "\nconst __default__ = defineComponent({\n  render,\n\n  __scopeId:'").concat(scopeId, "',\n        "));
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
function compileSFC(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var content, descriptor, script, scriptSetup, template, styles, id, hasScope, scopeId, content_1, render, code, fileCompiledName;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, fs_extra_1.readFile)(filePath, 'utf-8')];
                case 1:
                    content = _a.sent();
                    descriptor = (0, compiler_sfc_1.parse)(content, { sourceMap: false }).descriptor;
                    script = descriptor.script, scriptSetup = descriptor.scriptSetup, template = descriptor.template, styles = descriptor.styles;
                    id = (0, hash_sum_1.default)(content);
                    (0, fs_extra_1.writeFileSync)((0, path_1.resolve)(process.cwd(), 'parse'), JSON.stringify(descriptor), 'utf-8');
                    hasScope = styles.some(function (style) { return style.scoped; });
                    scopeId = hasScope ? "data-v-".concat(id) : '';
                    if (!(script || scriptSetup)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, compiler_sfc_1.compileScript)(descriptor, Object.assign({ id: scopeId }, (0, lodash_1.get)((0, config_1.mergeConfig)(), 'compileConfig.sfcOption.script')))];
                case 2:
                    content_1 = (_a.sent()).content;
                    render = template &&
                        (0, compiler_sfc_1.compileTemplate)(Object.assign({
                            id: id,
                            source: template.content,
                            filename: filePath,
                            scoped: hasScope,
                        }, (0, lodash_1.get)((0, config_1.mergeConfig)(), 'compileConfig.sfcOption.template')));
                    if (render) {
                        code = render.code;
                        content_1 = injectRender(content_1, code, scopeId);
                    }
                    (0, fs_extra_1.removeSync)(filePath);
                    fileCompiledName = (0, utils_1.replaceExt)(filePath, '.js');
                    styles.forEach(function (style, index) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, dir, base, filename, code, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = (0, path_1.parse)(filePath), dir = _a.dir, base = _a.base;
                                    filename = (0, utils_1.replaceExt)(base, ".sfc".concat(index ? "_".concat(index) : '', ".css"));
                                    code = (0, compiler_sfc_1.compileStyle)(Object.assign({
                                        source: style.content,
                                        filename: filename,
                                        id: scopeId,
                                        scoped: style.scoped,
                                    }, (0, lodash_1.get)((0, config_1.mergeConfig)(), 'compileConfig.sfcOption.style'))).code;
                                    (0, fs_extra_1.writeFileSync)((0, path_1.resolve)(dir, filename), code, 'utf-8');
                                    content_1 = "import './".concat(filename, "'\n") + content_1;
                                    _b = style.lang === 'less';
                                    if (!_b) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, compile_less_1.compileLess)((0, path_1.resolve)(dir, filename))];
                                case 1:
                                    _b = (_c.sent());
                                    _c.label = 2;
                                case 2:
                                    _b;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    content_1 = (0, utils_1.handleScriptImportExt)(content_1);
                    (0, fs_extra_1.writeFileSync)(fileCompiledName, content_1, 'utf-8');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.compileSFC = compileSFC;
