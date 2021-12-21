/**
 * @description: 编译文件夹
 * @param {string} dir
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function compileDir(dir: string): Promise<void>;
/**
 * @description: 编译单个文件
 * @param {*} filePath
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function compileSingFile(filePath: any): Promise<void>;
/**
 * @description: 编译文件
 * @param {string} file
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function compileFile(file: string): Promise<void>;
export declare function umdCompile(): Promise<void>;
/**
 * @description: 编译预操作
 * @param {string} path
 * @param {CompileOpt} options
 * @return {*}
 */
export declare function preCompile(): Promise<void>;
