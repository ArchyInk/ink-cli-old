export declare type CompileOpt = {
    jsxOpt: any;
    sfcOpt: any;
    lessOpt: any;
};
export declare function compileDir(dir: string, options?: CompileOpt): Promise<void>;
export declare function compileSingFile(filePath: any, options?: CompileOpt): Promise<void>;
export declare function compileFile(file: string, options?: CompileOpt): Promise<void>;
export declare function preCompile(path: string, options?: CompileOpt): Promise<void>;
