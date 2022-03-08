function sum(a, b, c) {
  return a + b + c
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function pass(...args1) {
        return curried.apply(this, args1.concat(args))
      }
    }
  }
}

let curriedSum = curry(sum)

console.log(curriedSum(1)(2)(3)) // 3
