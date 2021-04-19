function fibonacciIterative(n) {
  if (n < 1) {
    return 0
  }
  if (n <= 2) {
    return 1
  }
  return fibonacciIterative(n - 1) + fibonacciIterative(n - 2)
}

function fibonacciIterative1(n) {
  if (n <= 0) {
    return 0
  }
  if (n <= 1) {
    return 1
  }
  let f0 = 0,
    f1 = 1
  let result = 0
  for (let i = 2; i <= n; i++) {
    result = f0 + f1
    f0 = f1
    f1 = result
  }
  return result
}

console.log(fibonacciIterative(10))
console.log(fibonacciIterative1(10))
