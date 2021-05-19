function instance_of(left, right) {
  const rightPrototype = right.prototype
  const leftPrototype = left.__proto__
  while (true) {
    if (leftPrototype === null) {
      return false
    }
    if (rightPrototype === leftPrototype) {
      return true
    }
    leftPrototype = leftPrototype.__proto__
  }
}

const obj = new Object()

console.log(Object);

console.log(instance_of(obj, Object));
