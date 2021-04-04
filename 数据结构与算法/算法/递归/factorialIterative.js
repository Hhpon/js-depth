function factorialIterative(n) {
  if (n === 1) {
    return n
  }
  return n * factorialIterative(n - 1)
}

console.log(factorialIterative(3))
