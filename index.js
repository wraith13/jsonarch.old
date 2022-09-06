var Jsonarch;
(function (Jsonarch) {
    Jsonarch.jsonStringify = function (source, replacer, space) { return JSON.stringify(source, replacer, space); };
    Jsonarch.objectKeys = function (target) { return Object.keys(target); };
    Jsonarch.isJsonarch = function (template) {
        return null !== template &&
            "object" === typeof template &&
            "$arch" in template &&
            "string" === typeof template.$arch;
    };
    Jsonarch.isStaticTemplate = function (template) {
        return "static" === template.$arch;
    };
    Jsonarch.evaluate = function (template, _parameter, _setting) {
        if (Jsonarch.isStaticTemplate(template)) {
            return template.return;
        }
        return template;
    };
    Jsonarch.apply = function (template, parameter, setting) {
        if (null === template || "object" !== typeof template) {
            return template;
        }
        else if (Jsonarch.isJsonarch(template)) {
            return Jsonarch.evaluate(template, parameter, setting);
        }
        else if (Array.isArray(template)) {
            return template.map(function (i) { return Jsonarch.apply(i, parameter, setting); });
        }
        else {
            var result_1 = {};
            Jsonarch.objectKeys(template).forEach(function (key) { return result_1[key] = Jsonarch.apply(template, parameter, setting); });
            return result_1;
        }
    };
    Jsonarch.compile = function (template, parameter, settings) {
        if (parameter === void 0) { parameter = {}; }
        if (settings === void 0) { settings = { $arch: "setting", }; }
        var output = Jsonarch.apply(template, parameter, settings);
        var result = {
            $arch: "result",
            output: output,
            cache: settings.cache,
        };
        return result;
    };
})(Jsonarch || (Jsonarch = {}));
//# sourceMappingURL=index.js.map