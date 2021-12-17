<!--
 * @author: Archy
 * @Date: 2021-12-17 10:20:15
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 10:22:20
 * @FilePath: \ink-cli\mock\sfc\index.vue
 * @description: 
-->
<template>
  <div class="rect">{{ count }}</div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'MockSFC'
});
</script>
<script setup>
const count = ref(0)
setInterval(() => {
  count.value++
}, 1000)
</script>
<style lang='less' scoped>
@import "../less/extend.less";
.rect {
  height: 100px;
  width: 100px;
  background: #000;
}
</style>

<style>
.rect {
  border: 1px solid seagreen;
}
</style>