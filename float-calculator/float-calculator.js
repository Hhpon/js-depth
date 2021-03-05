function add(value) {
    return function (value1) {
        var _a, _b;
        if (typeof value1 !== "undefined") {
            var digit1 = ((_a = value.toString().split(".")[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
            var digit2 = ((_b = value1.toString().split(".")[1]) === null || _b === void 0 ? void 0 : _b.length) || 0;
            var m = Math.pow(10, Math.max(digit1, digit2));
            value = (Number(value) * m + Number(value1) * m) / m;
            return arguments.callee;
        }
        else {
            return value;
        }
    };
}
// 示例
// add(1)("0.1")(0.1)()
console.log(add(1)("0.1")(0.1)());
// '1.2'
// add(1)("ABC")()
console.log(add(1)("ABC")());
// 'NaN'
// add("1.1e+4")("-1")()
console.log(add("1.1e+4")("-1")());
// '10999'
