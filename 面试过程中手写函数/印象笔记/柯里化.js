function sum(a, b, c) {
  return a + b + c
}

function curry(fn) {
  return function curried(...args) {
    console.log(args)
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function pass(...args1) {
        return curried.apply(this, args.concat(args1))
      }
    }
  }
}

let curriedSum = curry(sum)

console.log(curriedSum(1)(2)(3)) // 3

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function pass(...passArgs) {
        return curried.apply(this, args.concat(passArgs))
      }
    }
  }
}
