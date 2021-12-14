export declare type CompileDirOpt = {
    jsxOpt: any;
    sfcOpt: any;
    lessOpt: any;
};
export declare function compileDir(dir: string, options?: CompileDirOpt): Promise<void>;
export declare function compileFile(file: string, options?: CompileDirOpt): Promise<void>;
export declare function preCompileDir(dir: string, options?: CompileDirOpt): Promise<void>;
