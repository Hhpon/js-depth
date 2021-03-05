function add(value?: number | string) {
  return function (value1?: number | string): any {
    if (typeof value1 !== "undefined") {
      let digit1 = value.toString().split(".")[1]?.length || 0
      let digit2 = value1.toString().split(".")[1]?.length || 0
      let m = 10 ** Math.max(digit1, digit2)
      value = (Number(value) * m + Number(value1) * m) / m
      return arguments.callee
    } else {
      return value
    }
  }
}

// 示例
// add(1)("0.1")(0.1)()
console.log(add(1)("0.1")(0.1)())
// '1.2'
// add(1)("ABC")()
console.log(add(1)("ABC")())
// 'NaN'
// add("1.1e+4")("-1")()
console.log(add("1.1e+4")("-1")())
// '10999'
