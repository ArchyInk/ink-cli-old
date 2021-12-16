import type { CompileOpt } from '../types/compiler';
/**
 * @description: 编译文件夹
 * @param {string} dir
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function compileDir(dir: string, options?: CompileOpt): Promise<void>;
/**
 * @description: 编译单个文件
 * @param {*} filePath
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function compileSingFile(filePath: any, options?: CompileOpt): Promise<void>;
/**
 * @description: 编译文件
 * @param {string} file
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function compileFile(file: string, options?: CompileOpt): Promise<void>;
/**
 * @description: 编译预操作
 * @param {string} path
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function preCompile(path: string, options?: CompileOpt): Promise<void>;
