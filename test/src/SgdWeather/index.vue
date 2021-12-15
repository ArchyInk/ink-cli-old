<!--
 * @author: Archy
 * @Date: 2021-11-10 09:48:41
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-15 10:04:47
 * @FilePath: \ink-cli\test\src\SgdWeather\index.vue
 * @description: 
-->
<template>
  <div class="relative">
    <img
      :src="background"
      :alt="backgroundAltAndTitle"
      :title="backgroundAltAndTitle"
      class="w-full z-0"
    />
    <div class="title absolute z-10 top-5 left-8 text-white">
      <span>{{ username }}，欢迎登陆本系统</span>
      <br />
    </div>
    <div class="content absolute z-10 bottom-8 left-8 text-white">
      <span :title="today.tip">
        <span class="text-6xl">{{ today.temperature }}</span>
        <span class="text-3xl">℃</span>
        <div class="inline-block text-sm leading-4 ml-2">
          <span>
            {{ today.type }}
            <br />
            {{ today.windArrow }}
          </span>
        </div>
      </span>
    </div>
  </div>
  <div class="footer bg-white py-4 px-2 flex items-center justify-between">
    <div class="text-2xl text-gray-300">{{ time }}</div>
    <div class="text-sm text-gray-600">{{ city }}&nbsp;{{ date }}&nbsp;{{ day }}</div>
  </div>
</template>
<script>
import { defineComponent, ref, inject, onMounted, computed, reactive } from "vue";
import { dayjs, instanceLocaleData } from "sgd-utils";
import { useStore } from "vuex";
import { jsonp } from "vue-jsonp";
import bgYu from './background/yu.png'
import bgXue from './background/xue.png'
import bgQing from './background/qing.png'
import bgYin from './background/yin.png'
import bgDefault from './background/weather.png'
export default defineComponent({
  name: "SgdWeather",
});
</script>
<script setup>
// vuex实例
const store = useStore();
// 获取用户名
const username = computed(() => store.getters.userInfo.userInfo.loginName);

// 星期
const day = ref("");
// 时间
const time = ref("");
// 日期
const date = ref("");

// 填充两位数
const padStartZero = (num) => {
  return typeof num === "string" ? num.padStart(2, "0") : num.toString().padStart(2, "0");
};

// 获取时间
const getTime = () => {
  day.value = instanceLocaleData.weekdays(dayjs());
  time.value = `${padStartZero(dayjs().hour())}:${padStartZero(
    dayjs().minute()
  )}:${padStartZero(dayjs().second())}`;
  date.value = `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`;
};

// 时间更新
setInterval(() => {
  getTime();
}, 1000);

// 背景图
const background = ref(null);
// 今日温度
const today = reactive({ temperature: 0, windArrow: "", tip: "", type: "" });
// 背景图alt和title
const backgroundAltAndTitle = ref(null);
// 获取天气背景图
const getWeatherBg = (type) => {
  if (type.includes("雨")) {
    return bgYu
  } else if (type.includes("雪")) {
    return bgXue
  } else if (type.includes("晴")) {
    return bgQing
  } else if (type.includes("阴") || type.includes("云")) {
    return bgYin
  } else {
    return bgDefault
  }
};
// 城市
const city = ref("");
onMounted(async () => {
  // 用jsonp规避跨域
  const _city = await jsonp("https://restapi.amap.com/v3/ip", {
    key: "0113a13c88697dcea6a445584d535837",
  });
  if (_city) {
    city.value = _city.city;
  } else {
    city.value = "获取城市失败";
    inject("message").error("获取城市失败");
  }

  const {
    status,
    data: { wendu, ganmao, forecast },
  } = await jsonp("http://wthrcdn.etouch.cn/weather_mini", {
    city: _city.city,
  });

  if (status === 1000) {
    const _today = forecast[0];
    background.value = getWeatherBg(_today.type);
    backgroundAltAndTitle.value = _today.type;
    today.temperature = wendu;
    today.windArrow = _today.fengxiang;
    today.tip = ganmao;
    today.type = _today.type;
  } else {
    inject("message").error("请求天气情况失败！");
  }
});
</script>
<style lang="less" scoped>
.test{
  background:#fff
}
</style>
