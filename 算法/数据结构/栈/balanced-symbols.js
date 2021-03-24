const Stack = require("./stack")

function parenthesesChecker(symbols) {
  const stack = new Stack()
  const opens = "({["
  const closes = ")}]"
  let index = 0
  let balance = true
  let symbol
  let top

  while (index < symbols.length && balance) {
    symbol = symbols[index]
    if (opens.indexOf(symbol) > -1) {
      stack.push(symbol)
    } else {
      if (stack.isEmpty()) {
        balance = false
      } else {
        top = stack.pop()
        if (opens.indexOf(top) !== closes.indexOf(symbol)) {
          balance = false
        }
      }
    }
    index++
  }
  return balance
}

console.log("{([])}", parenthesesChecker("{([])}")) // true
console.log("{{([][])}()}", parenthesesChecker("{{([][])}()}")) // true
console.log("[{()]", parenthesesChecker("[{()]")) // false
