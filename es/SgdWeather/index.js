import { defineComponent, ref, inject, onMounted, computed, reactive } from "vue";
import { dayjs, instanceLocaleData } from "sgd-utils";
import { useStore } from "vuex";
import { jsonp } from "vue-jsonp";
import bgYu from './background/yu.png'
import bgXue from './background/xue.png'
import bgQing from './background/qing.png'
import bgYin from './background/yin.png'
import bgDefault from './background/weather.png'
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue"

const _withScopeId = n => (_pushScopeId("data-v-bfd91810"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "relative" }
const _hoisted_2 = ["src", "alt", "title"]
const _hoisted_3 = { class: "title absolute z-10 top-5 left-8 text-white" }
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("br", null, null, -1 /* HOISTED */))
const _hoisted_5 = { class: "content absolute z-10 bottom-8 left-8 text-white" }
const _hoisted_6 = ["title"]
const _hoisted_7 = { class: "text-6xl" }
const _hoisted_8 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("span", { class: "text-3xl" }, "℃", -1 /* HOISTED */))
const _hoisted_9 = { class: "inline-block text-sm leading-4 ml-2" }
const _hoisted_10 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("br", null, null, -1 /* HOISTED */))
const _hoisted_11 = { class: "footer bg-white py-4 px-2 flex items-center justify-between" }
const _hoisted_12 = { class: "text-2xl text-gray-300" }
const _hoisted_13 = { class: "text-sm text-gray-600" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", _hoisted_1, [
      _createElementVNode("img", {
        src: _ctx.background,
        alt: _ctx.backgroundAltAndTitle,
        title: _ctx.backgroundAltAndTitle,
        class: "w-full z-0"
      }, null, 8 /* PROPS */, _hoisted_2),
      _createElementVNode("div", _hoisted_3, [
        _createElementVNode("span", null, _toDisplayString(_ctx.username) + "，欢迎登陆本系统", 1 /* TEXT */),
        _hoisted_4
      ]),
      _createElementVNode("div", _hoisted_5, [
        _createElementVNode("span", {
          title: _ctx.today.tip
        }, [
          _createElementVNode("span", _hoisted_7, _toDisplayString(_ctx.today.temperature), 1 /* TEXT */),
          _hoisted_8,
          _createElementVNode("div", _hoisted_9, [
            _createElementVNode("span", null, [
              _createTextVNode(_toDisplayString(_ctx.today.type) + " ", 1 /* TEXT */),
              _hoisted_10,
              _createTextVNode(" " + _toDisplayString(_ctx.today.windArrow), 1 /* TEXT */)
            ])
          ])
        ], 8 /* PROPS */, _hoisted_6)
      ])
    ]),
    _createElementVNode("div", _hoisted_11, [
      _createElementVNode("div", _hoisted_12, _toDisplayString(_ctx.time), 1 /* TEXT */),
      _createElementVNode("div", _hoisted_13, _toDisplayString(_ctx.city) + " " + _toDisplayString(_ctx.date) + " " + _toDisplayString(_ctx.day), 1 /* TEXT */)
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
const __default__ = defineComponent({
        render,        
  name: "SgdWeather",
});

export default /*#__PURE__*/Object.assign(__default__, {
  setup(__props, { expose }) {
  expose();

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

const __returned__ = { store, username, day, time, date, padStartZero, getTime, background, today, backgroundAltAndTitle, getWeatherBg, city, defineComponent, ref, inject, onMounted, computed, reactive, dayjs, instanceLocaleData, useStore, jsonp, bgYu, bgXue, bgQing, bgYin, bgDefault }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

})
import 'D:\archy_ink\ink-cli\es\SgdWeather\index.sfc.less'