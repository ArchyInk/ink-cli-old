/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 23:41:27
 * @FilePath: \ink-cli\mock\tsx\index.tsx
 * @description: 
 */
import { defineComponent, ref } from 'vue'
import '../index.less'
export default defineComponent({
  name: 'MockJsx',
  setup() {
    const count = ref(0)
    setInterval(() => {
      count.value++
    }, 1000)
    return () => {
      return <div className='rect'>{count}</div>
    }
  },
})
