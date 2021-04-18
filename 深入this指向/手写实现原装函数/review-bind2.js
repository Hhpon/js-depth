/**
 *
 * 2021-04-17 复习基础知识
 *
 * 边界处理
 * 1. bind 如果没有传入target时怎么办
 */

function isObject(obj) {
  return obj !== null && (typeof obj === "function" || typeof obj === "object")
}

function getGlobalObject() {
  return this
}

function selfBind(target) {
  if (typeof this !== "function") {
    throw new TypeError("must be function")
  }
  if (target === undefined) {
    target = getGlobalObject()
  }
  if (!isObject(target)) {
    target = Object(target)
  }
  const self = this
  const args = Array.prototype.slice.call(arguments, 1)
  let bound
  function binder() {
    if (this instanceof bound) {
      const result = self.apply(this, args.concat(Array.prototype.slice.call(arguments)))
      return isObject(result) ? result : this
    } else {
      return self.apply(target, args.concat(Array.prototype.slice.call(arguments)))
    }
  }

  const boundLength = Math.max(0, self.length - args.length)

  const boundArgs = []
  for (let i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i)
  }

  bound = Function("binder", "return function(" + boundArgs.join(",") + "){ return binder.apply(this,arguments) }")(binder)

  if (self.prototype) {
    function Empty() {}
    Empty.prototype = self.prototype
    bound.prototype = new Empty()
    Empty = null
  }

  return bound
}

Function.prototype.selfBind = selfBind

Person.prototype.sayAge = function () {
  console.log(this.age)
}

function Person(age) {
  console.log(this.name)
  this.age = age
}

const andy = {
  name: "刘德华",
}

// console.log(sayName.selfBind(person))

const PersonBind = Person.selfBind(andy)
const person = new PersonBind(20)
console.log(person)
person.sayAge()

function testSelfBind(age, name) {
  console.log(this)
}

console.log(testSelfBind.bind(this, 1).length)
testSelfBind.selfBind(true)()
