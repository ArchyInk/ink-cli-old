import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MockJsx',
  setup: () => {
    return () => {
      return (<div>MockJsx</div>)
    }
  },
})
