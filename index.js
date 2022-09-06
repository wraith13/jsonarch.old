var PlasticJson;
(function (PlasticJson) {
    PlasticJson.jsonStringify = function (source, replacer, space) { return JSON.stringify(source, replacer, space); };
    PlasticJson.objectKeys = function (target) { return Object.keys(target); };
    PlasticJson.isPlasticJson = function (template) {
        return null !== template &&
            "object" === typeof template &&
            "$plastic" in template &&
            "string" === typeof template.$plastic;
    };
    PlasticJson.isStaticTemplate = function (template) {
        return "static" === template.$plastic;
    };
    PlasticJson.evaluate = function (template, _parameter, _setting) {
        if (PlasticJson.isStaticTemplate(template)) {
            return template.return;
        }
        return template;
    };
    PlasticJson.apply = function (template, parameter, setting) {
        if (null === template || "object" !== typeof template) {
            return template;
        }
        else if (PlasticJson.isPlasticJson(template)) {
            return PlasticJson.evaluate(template, parameter, setting);
        }
        else if (Array.isArray(template)) {
            return template.map(function (i) { return PlasticJson.apply(i, parameter, setting); });
        }
        else {
            var result_1 = {};
            PlasticJson.objectKeys(template).forEach(function (key) { return result_1[key] = PlasticJson.apply(template, parameter, setting); });
            return result_1;
        }
    };
    PlasticJson.compile = function (template, parameter, settings) {
        if (parameter === void 0) { parameter = {}; }
        if (settings === void 0) { settings = { $plastic: "setting", }; }
        var output = PlasticJson.apply(template, parameter, settings);
        var result = {
            $plastic: "result",
            output: output,
            cache: settings.cache,
        };
        return result;
    };
})(PlasticJson || (PlasticJson = {}));
//# sourceMappingURL=index.js.map