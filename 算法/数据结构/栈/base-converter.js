const Stack = require("./stack")

function baseConverter(decNumber, base) {
  const remStack = new Stack()
  const number = "0123456789ABCDEF"
  let result = ""

  while (decNumber > 0) {
    const num = decNumber % base
    remStack.push(num)
    decNumber = Math.floor(decNumber / base)
  }

  while (!remStack.isEmpty()) {
    result += number[remStack.pop()]
  }

  return result
}

console.log(baseConverter(100345, 2)) // 11000011111111001
console.log(baseConverter(100345, 8)) // 303771
console.log(baseConverter(100345, 16)) // 187F9
