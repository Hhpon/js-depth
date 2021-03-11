"use strict"

type numType = number | string

function strip(num: numType, precision = 15): number {
  return +parseFloat(Number(num).toPrecision(precision))
}

function digitLength(num: numType): number {
  const eSplit = num.toString().split(/[eE]/)
  const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0)
  return len > 0 ? len : 0
}

function float2Fixed(num: numType): number {
  if (num.toString().indexOf("e") === -1) {
    return Number(num.toString().replace(".", ""))
  }
  const dLen = digitLength(num)
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num)
}

function times(num1: numType, num2: numType) {
  const num1Changed = float2Fixed(num1)
  const num2Changed = float2Fixed(num2)
  const baseNum = digitLength(num1) + digitLength(num2)
  const leftValue = num1Changed * num2Changed

  return leftValue / Math.pow(10, baseNum)
}

function add(value?: numType) {
  return function secondaryAdd(secondaryValue?: numType): any {
    if (typeof secondaryValue !== "undefined") {
      const baseNum = Math.pow(10, Math.max(digitLength(value), digitLength(secondaryValue)))
      value = (times(value, baseNum) + times(secondaryValue, baseNum)) / baseNum
      return secondaryAdd
    } else {
      return value
    }
  }
}

// 示例
// add(1)("0.1")(0.1)()
console.log(add(1)("0.1")(0.1)()) // '1.2'
// add(1)("ABC")()
console.log(add(1)("ABC")()) // 'NaN'
// add("1.1e+4")("-1")()
console.log(add("1.1e+4")("-1")()) // '10999'

console.log(add(0.1)(0.2)())

console.log(add("1.000000000000000000000000000000000000000000000000001")(0.1)())
