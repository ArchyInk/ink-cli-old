export declare function runTask(taskName: string, task: (path: string, options: Object) => Promise<void>, path: string, options?: Object): Promise<void>;
export declare function compile(cmd: {
    path: string;
    optPath: string;
}): Promise<void>;
