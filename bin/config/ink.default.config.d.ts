declare const _default: {
    compileConfig: {
        babelConfig: {
            presets: (string | (string | {
                modules: string | boolean;
            })[])[];
        };
        jsxOption: {};
        jsOption: {};
        lessOption: {};
        sfcOption: {
            template: {};
            script: {};
            style: {};
        };
    };
    output: {
        esm: string;
        esmodule: string;
        cjs: string;
        commonjs: string;
        umd: string;
    };
    include: string[];
    exclude: any[];
    target: string[];
};
export default _default;
