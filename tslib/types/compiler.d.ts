import type { ConfigAPI } from '@babel/core';
export declare type CompileOpt = {
    babelConfig?: ConfigAPI;
    sfcOptions?: CompileSFCOpt;
    lessOptions?: Object;
    options?: CompileCommonOpt;
};
export declare type CompileSFCOpt = {
    templateOptions?: Object;
    scriptOptions?: Object;
    styleOptions?: Object;
};
export declare type CompileCommonOpt = {
    ignore?: Array<string> | string;
    target?: Array<'umd' | 'esmodule' | 'commonjs'>;
};
