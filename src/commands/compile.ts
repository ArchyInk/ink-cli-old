/*
 * @Author: Archy
 * @Date: 2021-12-15 20:12:24
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-16 16:40:15
 * @FilePath: \ink-cli\src\commands\compile.ts
 * @description:
 */
import { preCompile,compileFile } from '../compiler/bundler'
import ora from 'ora'
import { readJson } from 'fs-extra'
import { CONFIG_PATH, CWD } from '../shared/constant'
import { isFile } from 'src/shared/utils'
import { resolve } from 'path'

export async function runTask(
  taskName: string,
  task: (path: string, options: Object) => Promise<void>,
  path: string,
  options?: Object
) {
  const taskStart = ora().start(`Compiling ${taskName}`)
  try {
    await task(path, options)
    taskStart.succeed(`Compilation ${taskName} completed!`)
  } catch (e: any) {
    console.log(e)
    taskStart.fail(`Compilation ${taskName} failed!`)
  }
}

export async function compile(cmd: { path: string; optPath: string }) {
  const { path, optPath } = cmd
  optPath === CONFIG_PATH ? CONFIG_PATH : resolve(CWD, optPath)
  const options = await readJson(optPath, 'utf-8')
  runTask('normal', preCompile, path, options)
}
