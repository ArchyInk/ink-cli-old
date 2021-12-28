import './index.sfc_1.css'
import './index.sfc.css'
import { defineComponent, ref } from 'vue';
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue"

const _withScopeId = n => (_pushScopeId("data-v-7186670d"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "rect" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, _toDisplayString(_ctx.count), 1 /* TEXT */))
}
const __default__ = defineComponent({
  render,

  __scopeId:'data-v-7186670d',
        
  name: 'MockSFC'
});

export default /*#__PURE__*/Object.assign(__default__, {
  setup(__props, { expose }) {
  expose();

const count = ref(0)
setInterval(() => {
  count.value++
}, 1000)

const __returned__ = { count, defineComponent, ref }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

})