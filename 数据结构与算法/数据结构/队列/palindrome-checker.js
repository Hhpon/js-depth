const Deque = require("./deque")

/**
 *
 * @param {string} aString
 * @returns
 */
function palindromeChecker(aString) {
  const deque = new Deque()
  let isEqual = true
  let index = 0
  let firstChar, lastChar
  aString = aString.toLocaleLowerCase().split(" ").join("")
  while (index < aString.length) {
    deque.addBack(aString.charAt(index))
    index++
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }

  return isEqual
}

console.log("a", palindromeChecker("a"))
console.log("aa", palindromeChecker("aa"))
console.log("kayak", palindromeChecker("kayak"))
console.log("level", palindromeChecker("level"))
console.log("Was it a car or a cat I saw", palindromeChecker("Was it a car or a cat I saw"))
console.log("Step on no pets", palindromeChecker("Step on no pets"))
