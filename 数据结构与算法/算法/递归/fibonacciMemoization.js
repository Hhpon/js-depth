function fibonacciMemoization(n) {
  const memo = [0, 1]
  const fibonacci = (n) => {
    const result = memo[n]
    if (result) {
      return result
    }
    if (n < 1) {
      return 0
    }
    if (n <= 2) {
      return 1
    }
    return (memo[n] = fibonacci(n - 1) + fibonacci(n - 2))
  }
  return fibonacci(n)
}

console.log(fibonacciMemoization(5))
