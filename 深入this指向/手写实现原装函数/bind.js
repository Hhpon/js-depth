/**
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 *
 * 绑定函数也可以使用 new 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 this 值会被忽略，但前置参数仍会提供给模拟函数。
 *
 * 1. 正常函数方式调用时，改变函数的this指向
 * 2. 构造函数调用，构造函数需要继承this
 */

// const selfBind = require("./bind-shim")

function selfBind(context) {
  if (typeof this !== "function") {
    throw "不是函数"
  }

  const self = this
  const args = Array.prototype.slice.call(arguments, 1)

  const bound = function () {
    const finalArgs = Array.from(arguments).concat(args)
    return self.apply(this instanceof bound ? this : context, finalArgs)
  }

  function Empty() {}

  Empty.prototype = this.prototype
  bound.prototype = new Empty()

  return bound
}

Function.prototype.selfBind = selfBind

function andy(name) {
  this.name = name
  return "this"
}

andy.prototype.age = 50

andy.prototype.sayName = function () {
  console.log(this.name)
}

const obj = {
  name: "张学友",
  sing: "吻别",
}

const obj1 = andy.bind(obj)
const obj2 = andy.selfBind(obj)

console.log("=======================  obj1 Start  =====================")
const obj1Ret = obj1("张学友")
try {
  obj1.sayName()
} catch (error) {
  console.log(error)
}
console.log(obj1.length)
console.log(obj1.name)
console.log(obj1Ret)
console.log("=======================  obj1 End  =======================")

console.log("=======================  obj2 Start  =====================")
const obj2Ret = obj2("张学友")
try {
  obj2.sayName()
} catch (error) {
  console.log(error)
}
console.log(obj2.length)
console.log(obj2.name)
console.log(obj2Ret)
console.log("=======================  obj2 End  =======================")

const person1 = new obj1("周华健")
const person2 = new obj2("周华健")

console.log("=======================  person1 Start  =====================")
console.log(person1)
try {
  person1.sayName()
} catch (error) {
  console.log(error)
}
console.log("=======================  person1 End  =======================")

console.log("=======================  person2 Start  =====================")
console.log(person2)
try {
  person2.sayName()
} catch (error) {
  console.log(error)
}
person2.__proto__.age = 51
console.log(andy.prototype.age)
console.log("=======================  person2 End  =======================")

const testAndy = new andy("测试Andy")
