"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

require("../index.css");

/*
 * @Author: Archy
 * @Date: 2021-12-17 19:35:55
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 23:41:27
 * @FilePath: \ink-cli\mock\tsx\index.tsx
 * @description: 
 */
var _default = (0, _vue.defineComponent)({
  name: 'MockJsx',
  setup: function setup() {
    var count = (0, _vue.ref)(0);
    setInterval(function () {
      count.value++;
    }, 1000);
    return function () {
      return (0, _vue.createVNode)("div", {
        "className": 'rect'
      }, [count]);
    };
  }
});

exports["default"] = _default;