import { defineComponent } from "vue";
export default defineComponent({
  name: "Ignore",
  setup() {
    return () => {
      return (<div>ignore</div>);
    };
  },
});
