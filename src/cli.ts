/*
 * @author: Archy
 * @Date: 2021-12-14 09:53:57
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 09:44:30
 * @FilePath: \ink-cli\src\cli.ts
 * @description: 
 */
import { Command } from 'commander'
import { dir } from 'console'
import { readJson } from 'fs-extra'
import { resolve } from 'path'
import { compile } from './commands'
import { SRC_DIR, CWD, CONFIG_PATH } from './shared/constant'
const program = new Command()
program.command('compile')
  .option('-d,--dirPath <dirPath>', 'the path need to compile', SRC_DIR)
  .option('-o,--optFile [value]', 'the compiler config file', CONFIG_PATH)
  .description('Compile dir')
  .action(async (options) => {
    const { dirPath, optFile } = options
    if (optFile) {
      const optFullFile = optFile === CONFIG_PATH ? CONFIG_PATH : resolve(CWD, optFile)
      const optContent = await readJson(optFullFile, 'utf-8')
      compile(dirPath, optContent)
    } else {
      compile(dirPath)
    }
  })

program.parse();