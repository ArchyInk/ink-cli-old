<!--
 * @Author: Archy
 * @Date: 2021-12-15 23:59:50
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 23:59:52
 * @FilePath: \ink-cli\mock\sfc\vue2.vue
 * @description: 
-->
<!--
 * @Author: Archy
 * @Date: 2021-12-15 20:26:08
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 20:27:30
 * @FilePath: \ink-cli\mock\sfc\vue2.vue
 * @description: 
-->
<template>
  <div class="scale-up-tl rect">{{count}}</div>
</template>
<script>
export default {
  name: 'MockSFC',
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    setTimeout(() => {
      count++
    }, 1000)
  }
}
</script>
<style lang='less' scoped>
@-webkit-keyframes scale-up-tl {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}
@keyframes scale-up-tl {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}
.scale-up-tl {
  -webkit-animation: scale-up-tl 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-tl 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
</style>

<style>
.rect {
  height: 100px;
  width: 100px;
  background: #000;
}
</style>