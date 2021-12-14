import { preCompileDir } from '../compiler/bundler'
import ora from 'ora'

export async function runTask(taskName: string, task: (dir: string, options: Object) => Promise<void>, dir: string, options?: Object) {
  const taskStart = ora().start(`Compiling ${taskName}`)
  try {
    await task(dir, options)
    taskStart.succeed(`Compilation ${taskName} completed!`)
  } catch (e: any) {
    console.log(e);
    taskStart.fail(`Compilation ${taskName} failed!`)
  }
}

export function compile(dir: string, options?: Object) {
  options ? runTask('compile', preCompileDir, dir, options) : runTask('compile', preCompileDir, dir)
}