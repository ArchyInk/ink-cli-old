/**
 * @description: inject transformed render result and scopeId into script
 * @param {string} script
 * @param {string} render
 * @return {*}
 */
export declare function injectRender(script: string, render: string, scopeId: string): string;
/**
 * @description: compile .vue file
 * @param {string} filePath
 * @param {any} options
 * @return {*}
 */
export declare function compileSFC(filePath: string): Promise<void>;
