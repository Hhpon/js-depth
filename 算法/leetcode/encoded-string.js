/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let index = 0
  const stack = []
  let ele
  while (index < s.length) {
    ele = s.charAt(index)
    if (ele !== "]") {
      if (!isNaN(Number(ele)) && !isNaN(stack[stack.length - 1])) {
        stack[stack.length - 1] = stack[stack.length - 1] + ele
      } else {
        stack.push(ele)
      }
    } else {
      const temStack = []
      let top = stack.pop()
      while (top !== "[") {
        temStack.push(top)
        top = stack.pop()
      }
      let count = stack.pop()
      temStack.reverse()
      stack.push(setString(count, temStack))
    }
    index++
  }
  return stack.join("")
}

function setString(count, stack) {
  let index = 0
  let result = stack.join('').repeat(count)
  while (index < count) {
    result += stack.join("")
    index++
  }
  return result
}

decodeString("33[a]2[bc]")
