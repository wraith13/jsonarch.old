"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerCase = exports.make = exports.basic = void 0;
var basic = function (a, b) {
    return a < b ? -1 :
        b < a ? 1 :
            0;
};
exports.basic = basic;
var make = function (source) {
    var _a;
    var invoker = function (i) {
        var f = i;
        if ("function" === typeof f) {
            return function (a, b) { return (0, exports.basic)(f(a), f(b)); };
        }
        var r = i;
        if (undefined !== (r === null || r === void 0 ? void 0 : r.raw)) {
            return r.raw;
        }
        var s = i;
        if (undefined !== (s === null || s === void 0 ? void 0 : s.getter)) {
            var body_1 = function (a, b) { return (0, exports.basic)(s.getter(a), s.getter(b)); };
            if (undefined === s.condition) {
                return body_1;
            }
            else {
                var f_1 = s.condition;
                if ("function" === typeof f_1) {
                    return function (a, b) { return f_1(a, b) ? body_1(a, b) : 0; };
                }
                else {
                    var t_1 = s.condition;
                    var getter_1 = t_1.getter;
                    if (undefined === getter_1) {
                        return function (a, b) { return t_1.type === typeof a && t_1.type === typeof b ? body_1(a, b) : 0; };
                    }
                    else {
                        return function (a, b) { return t_1.type === typeof getter_1(a) && t_1.type === typeof getter_1(b) ? body_1(a, b) : 0; };
                    }
                }
            }
        }
        return undefined;
    };
    if (Array.isArray(source)) {
        var comparerList_1 = source.map(invoker).filter(function (i) { return undefined !== i; });
        return function (a, b) {
            var result = 0;
            for (var i = 0; i < comparerList_1.length && 0 === result; ++i) {
                result = comparerList_1[i](a, b);
            }
            return result;
        };
    }
    else {
        return (_a = invoker(source)) !== null && _a !== void 0 ? _a : (function () { return 0; });
    }
};
exports.make = make;
exports.lowerCase = (0, exports.make)([function (a) { return a.toLowerCase(); }, { raw: exports.basic }]);
//# sourceMappingURL=comparer.js.map