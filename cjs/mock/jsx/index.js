"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

require("../index.css");

var _default = (0, _vue.defineComponent)({
  name: 'MockJsx',
  setup: function setup() {
    var count = (0, _vue.ref)(0);

    var test = require('../ts/index.js');

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