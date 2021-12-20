/*
 * @Author: Archy
 * @Date: 2021-12-15 20:12:24
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 17:27:18
 * @FilePath: \ink-cli\src\commands\compile.ts
 * @description:
 */
import { preCompile } from '../compiler/bundler'
import ora from 'ora'
import { mergeConfig } from '../config/config'

export async function runTask(
  taskName: string,
  task: Function,
) {
  const taskStart = ora().start(`Compiling ${taskName}`)
  try {
    await task()
    taskStart.succeed(`Compilation ${taskName} completed!`)
  } catch (e: any) {
    console.error(e)
    taskStart.fail(`Compilation ${taskName} failed!`)
  }
}

export async function compile() {
  const emun = ['commonjs', 'umd', 'cjs', 'esm', 'esmodule']
  emun.forEach(async t => {
    process.env.COMPILE_TARGET = t
    const { target } = mergeConfig()
    if (target.includes(t)) {
      await runTask(t, preCompile)
    }
  });
}
