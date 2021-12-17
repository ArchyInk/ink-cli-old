import { defineComponent, ref } from "vue";
import '../index.less'
export default defineComponent({
  name: "MockJsx",
  setup() {
    const count = ref(0);
    setInterval(() => {
      count.value++;
    }, 1000);
    return () => {
      return <div className="rect">{count}</div>;
    };
  },
});
