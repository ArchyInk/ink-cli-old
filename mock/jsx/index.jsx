import { defineComponent, ref } from 'vue'
import '../less/index.less'
export default defineComponent({
  name: 'MockJsx',
  setup: () => {
    return () => {
      return (<div>MockJsx</div>)
    }
  },
})
