"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.runTask = void 0;
/*
 * @Author: Archy
 * @Date: 2021-12-15 20:12:24
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-20 21:48:48
 * @FilePath: \ink-cli\src\commands\compile.ts
 * @description:
 */
var bundler_1 = require("../compiler/bundler");
var ora_1 = __importDefault(require("ora"));
var config_1 = require("../config/config");
var constant_1 = require("../shared/constant");
function runTask(taskName, task) {
    return __awaiter(this, void 0, void 0, function () {
        var compile, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    compile = (0, ora_1.default)().start("Compiling ".concat(taskName, "..."));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, task()];
                case 2:
                    _a.sent();
                    compile.succeed("Compilation ".concat(taskName, " completed!"));
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    compile.fail("Compilation ".concat(taskName, " failed!"));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.runTask = runTask;
function compile() {
    return __awaiter(this, void 0, void 0, function () {
        var COMPILE_TARGET_LIST_1, COMPILE_TARGET_LIST_1_1, t, target, e_2_1;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    COMPILE_TARGET_LIST_1 = __values(constant_1.COMPILE_TARGET_LIST), COMPILE_TARGET_LIST_1_1 = COMPILE_TARGET_LIST_1.next();
                    _b.label = 1;
                case 1:
                    if (!!COMPILE_TARGET_LIST_1_1.done) return [3 /*break*/, 4];
                    t = COMPILE_TARGET_LIST_1_1.value;
                    process.env.COMPILE_TARGET = t;
                    target = (0, config_1.mergeConfig)().target;
                    if (!target.includes(t)) return [3 /*break*/, 3];
                    return [4 /*yield*/, runTask(t, bundler_1.preCompile)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    COMPILE_TARGET_LIST_1_1 = COMPILE_TARGET_LIST_1.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (COMPILE_TARGET_LIST_1_1 && !COMPILE_TARGET_LIST_1_1.done && (_a = COMPILE_TARGET_LIST_1.return)) _a.call(COMPILE_TARGET_LIST_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.compile = compile;
