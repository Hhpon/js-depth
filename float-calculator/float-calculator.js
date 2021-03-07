"use strict";
function strip(num, precision) {
    if (precision === void 0) { precision = 15; }
    return +parseFloat(Number(num).toPrecision(precision));
}
function digitLength(num) {
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
}
function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
        return Number(num.toString().replace(".", ""));
    }
    var dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}
function times(num1, num2) {
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    var baseNum = digitLength(num1) + digitLength(num2);
    var leftValue = num1Changed * num2Changed;
    return leftValue / Math.pow(10, baseNum);
}
function add(value) {
    return function secondaryAdd(secondaryValue) {
        if (typeof secondaryValue !== "undefined") {
            var baseNum = Math.pow(10, Math.max(digitLength(value), digitLength(secondaryValue)));
            value = (times(value, baseNum) + times(secondaryValue, baseNum)) / baseNum;
            return secondaryAdd;
        }
        else {
            return value;
        }
    };
}
// 示例
// add(1)("0.1")(0.1)()
console.log(add(1)("0.1")(0.1)()); // '1.2'
// add(1)("ABC")()
console.log(add(1)("ABC")()); // 'NaN'
// add("1.1e+4")("-1")()
console.log(add("1.1e+4")("-1")()); // '10999'
console.log(add("1.000000000000000000000000000000000000000000000000001")(0.1)());
