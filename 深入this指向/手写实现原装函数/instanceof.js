/**
 *
 * @param {*} left
 * @param {*} right
 */
function checkPrototype(left, right) {
  let result = false
  let leftParent = Object.getPrototypeOf(left)
  while (leftParent != null && result === false) {
    result = leftParent === right.prototype
    leftParent = Object.getPrototypeOf(leftParent)
  }
  return result
}

function Andy() {}

const andy = new Andy()
const andy1 = "123"

console.log(andy instanceof Andy)
console.log(andy1 instanceof Andy)
console.log(checkPrototype(andy, Andy))
console.log(checkPrototype(andy1, Andy))
console.log(Andy instanceof Andy)
console.log(checkPrototype(Andy, Andy))
console.log(Andy)
console.log(Object)
