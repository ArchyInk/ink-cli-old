/*
 * @author: Archy
 * @Date: 2021-12-16 14:33:28
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 16:42:34
 * @FilePath: \ink-cli\src\types\compiler.ts
 * @description: 
 */
import type { ConfigAPI } from '@babel/core'
export type CompileOpt = {
  babelOptions?: ConfigAPI,
  sfcOptions?: CompileSFCOpt,
  lessOptions?: Object,
  options?: CompileCommonOpt
}

export type CompileSFCOpt = {
  templateOptions?: Object,
  scriptOptions?: Object,
  styleOptions?: Object
}


export type CompileCommonOpt = {
  ignore?: Array<string> | string,
  target?: Array<'umd' | 'module' | 'commonjs'>
}
