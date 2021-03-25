const Stack = require("../数据结构/栈/stack")

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = new Stack()
  let balance = true
  let index = 0
  const opens = "([{"
  const closes = ")]}"
  let top
  let symbol

  while (index < s.length && balance) {
    symbol = s.charAt(index)
    console.log(symbol);
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

console.log(isValid("()"))
console.log(isValid("["))
