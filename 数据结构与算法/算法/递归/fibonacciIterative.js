function fibonacciIterative(n) {
  if (n < 1) {
    return 0
  }
  if (n <= 2) {
    return 1
  }
  return fibonacciIterative(n - 1) + fibonacciIterative(n - 2)
}

console.log(fibonacciIterative(5))