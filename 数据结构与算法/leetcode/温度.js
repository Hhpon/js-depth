var dailyTemperatures = function (T) {
  var stack = []
  var ans = new Array(T.length).fill(0)
  T.forEach((num, index) => {
    while (stack.length > 0 && num > T[stack[stack.length - 1]]) {
      ans[stack[stack.length - 1]] = index - stack[stack.length - 1]
      stack.pop()
    }
    if (T[stack[stack.length - 1]] >= num || stack.length === 0) {
      stack.push(index)
    }
  })
  return ans
}

const t = [73, 74, 75, 71, 69, 72, 76, 73]

console.log(dailyTemperatures(t))
