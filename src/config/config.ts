
/*
 * @author: Archy
 * @Date: 2021-12-17 16:07:44
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 17:24:50
 * @FilePath: \ink-cli\src\config\config.ts
 * @description: 
 */
import findUp from "find-up"
import { CWD,CONFIG_DEFAULT_PATH } from "../shared/constant"
import { getRootPath } from "../shared/utils"

export const getInkConfig = async () => {
  getRootPath()
  CONFIG_DEFAULT_PATH
}

getInkConfig()
