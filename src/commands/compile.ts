/*
 * @Author: Archy
 * @Date: 2021-12-15 20:12:24
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-18 09:53:13
 * @FilePath: \ink-cli\src\commands\compile.ts
 * @description:
 */
import { preCompile } from '../compiler/bundler'
import ora from 'ora'
import { mergeConfig } from '../config/config'
import { COMPILE_TARGET_LIST } from '../shared/constant'

export async function runTask(taskName: string, task: Function) {
  const compile = ora().start(`Compiling ${taskName}...`)
  try {
    await task()
    compile.succeed(`Compilation ${taskName} completed!`)
  } catch (e: any) {
    console.error(e)
    compile.fail(`Compilation ${taskName} failed!`)
  }
}

export async function compile() {
  for (let t of COMPILE_TARGET_LIST) {
    process.env.COMPILE_TARGET = t
    const config = mergeConfig()
    const {
      compileConfig: { target },
    } = config
    if (target.includes(t)) {
      await runTask(t, preCompile)
    }
  }
}
