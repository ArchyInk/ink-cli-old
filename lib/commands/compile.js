"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.runTask = void 0;
const tslib_1 = require("tslib");
const bundler_1 = require("../compiler/bundler");
const ora_1 = (0, tslib_1.__importDefault)(require("ora"));
async function runTask(taskName, task, dir, options) {
    const taskStart = (0, ora_1.default)().start(`Compiling ${taskName}`);
    try {
        await task(dir, options);
        taskStart.succeed(`Compilation ${taskName} completed!`);
    }
    catch (e) {
        console.log(e);
        taskStart.fail(`Compilation ${taskName} failed!`);
    }
}
exports.runTask = runTask;
function compile(dir, options) {
    options ? runTask('compile', bundler_1.preCompileDir, dir, options) : runTask('compile', bundler_1.preCompileDir, dir);
}
exports.compile = compile;
