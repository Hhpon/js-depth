function add(value?: any) {
  console.log(value)
  return function (value1?: any) {
    if (typeof value1 !== undefined) {
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
add(1)("0.1")(0.1)()
// '1.2'
// add(1)("ABC")()
// 'NaN'
// add("1.1e+4")("-1")()
// '10999'

// function add(value) {
//   return function (value1) {
//     if (typeof value1 !== 'undefined') {
//       let vFloat = value.toString().split('.')[1]?.length || 0;
//       let v1Float = value1.toString().split('.')[1]?.length || 0;
//       let m = Math.pow(10, Math.max(vFloat, v1Float));
//       value = (Number(value) * m + Number(value1) * m) / m;
//       return arguments.callee;
//     } else {
//       return value;
//     }
//   };
// }
// let test1 = add(1)('0.1')(0.1)();
// console.log(test1);
// let test2 = add(1)('ABC')();
// console.log(test2);
// let test3 = add('1.1e+4')('-1')();
// console.log(test3);
