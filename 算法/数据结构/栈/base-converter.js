const Stack = require("./stack")

function baseConverter(decNumber, base) {
  const remStack = new Stack()
  const number = "0123456789ABCDEF"
  let result = ""

  while (decNumber > 0) {
    const num = decNumber % base
    remStack.push(num)
    decNumber = Math.floor(decNumber / base)
    console.log(decNumber)
  }

  while (!remStack.isEmpty()) {
    result += number[remStack.pop()]
  }

  console.log(result)
}

baseConverter(100345, 16)
