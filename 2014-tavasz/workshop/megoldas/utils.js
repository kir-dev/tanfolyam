var Utils = (function ($) {
    // ellenőrzi, hogy az adott obj objektumban a rulesban megfolgalmazott
    // szabályok teljesülnek-e
    var validate = function (obj, rules) {
        var req;

        for (var i = 0; i < rules.length; i++) {
            req = rules[i];
            //
            if (!obj.hasOwnProperty(req.property)) {
                return false;
            }
            if (req.invalidValues.indexOf(obj[req.property]) > -1) {
                return false;
            }
        }

        return true;
    }

    // ellenőrzi, hogy a felsorolt tulajdonságok léteznek-e
    // létezőnek tekintjük, ha nem üres string, null vagy undefined
    var validatePresenceOf = function (obj, props) {
        var rules = props.map(function (p) {
            return { property: p, invalidValues: ["", null, undefined] };
        });

        return validate(obj, rules);
    };

    // kinyeri a query string paramétereket
    var params = function () {
        return window.location.search
            .substr(1)
            .split('&')
            .reduce(function (params, kv) {
                var ps = kv.split("=");
                params[ps[0]] = decodeURIComponent(ps[1]);

                return params;
            }, {});
    }

    return {
        validate: validate,
        validatePresenceOf: validatePresenceOf,
        params: params(),
    };
})(jQuery);