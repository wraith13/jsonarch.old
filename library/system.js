"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLocalFile = exports.loadNetFile = exports.getLocale = exports.https = exports.fs = exports.isConsoleMode = void 0;
exports.isConsoleMode = typeof window === 'undefined';
exports.fs = exports.isConsoleMode ? require("fs") : undefined;
exports.https = exports.isConsoleMode ? require("https") : undefined;
var getLocale = function () { return exports.isConsoleMode ?
    Intl.DateTimeFormat().resolvedOptions().locale :
    navigator.language; };
exports.getLocale = getLocale;
exports.loadNetFile = exports.isConsoleMode ?
    function (path) { return new Promise(function (resolve, reject) { return exports.https.get(path, function (response) {
        //console.log('statusCode:', response.statusCode);
        //console.log('headers:', response.headers);
        if (200 <= response.statusCode && response.statusCode < 300) {
            var buffer_1 = "";
            response.on("data", function (chunk) { return buffer_1 += chunk; });
            response.on("end", function () { return resolve(buffer_1); });
        }
        else {
            reject();
        }
    })
        .on("error", function () { return reject(); }); }); } :
    function (path) { return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.onreadystatechange = function () {
            if (4 === request.readyState) {
                if (200 <= request.status && request.status < 300) {
                    resolve(request.responseText);
                }
                else {
                    reject();
                }
            }
        };
        request.send(null);
    }); };
exports.loadLocalFile = exports.isConsoleMode ?
    function (path) { return exports.fs.readFileSync(path, { encoding: "utf-8" }); } :
    function (_path) { throw new Error("Not support to load local file on web."); };
//# sourceMappingURL=system.js.map