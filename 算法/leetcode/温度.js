var dailyTemperatures = function (T) {
  var stack = []
  var ans = new Array(T.length).fill(0)
  T.forEach((num, index) => {
    if (stack.length > 0) {
      while (num > T[stack[stack.length - 1]]) {
        ans[stack[stack.length - 1]] = index - stack[stack.length - 1]
        stack.pop()
      }
      if (T[stack[stack.length - 1]] >= num) {
        console.log(index)
        stack.push(index)
      }
    } else {
      stack.push(index)
    }
  })
  return ans
}

const t = [73, 74, 75, 71, 69, 72, 76, 73]

console.log(dailyTemperatures(t))
