/**
 * apply、call方法会在原方法的基础上改变方法的this指向
 * 最后会在新的this指向上完成函数的执行
 *
 * apply、call当没有传输context的时候会把this指向window
 *
 * 原始方式存在两个问题 第一个是context对象上面存在fn属性。
 * 第二个是数组参数问题 ... 解构赋值不能使用的问题
 *
 * @param {Object} context
 * @param {Array} args
 * @returns
 */

function selfApply(context, args) {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function")
  }
  if (args == null) {
    args = []
  }
  if (args !== Object(args)) {
    throw new TypeError("CreateListFromArrayLike Called on non-object")
  }
  if (context == null) {
    context = getGlobalObject()
  }
  context = new Object(context)
  // 此处存在一个问题： 如果context上面存在fn属性呢？
  // context.fn = this
  const fn = "__" + new Date().getTime()
  const originalVal = context[fn]
  const hasOriginalVal = context.hasOwnProperty(fn)
  context[fn] = this
  // 如果不允许使用解构赋值的方式
  // const result = context[fn](...args)
  const code = getFunctionCode(args.length)
  const result = new Function(code)(context, fn, args)
  if (hasOriginalVal) {
    context[fn] = originalVal
  }
  return result
}

function getGlobalObject() {
  return this
}

function getFunctionCode(argsLength) {
  const args = []
  for (var i = 0; i < argsLength; i++) {
    args.push(`arguments[2][${i}]`)
  }
  return `arguments[0][arguments[1]](${args.join(",")})`
}

Function.prototype.selfApply = selfApply

function selfCall(context) {
  return this.selfApply(context, Array.prototype.slice.call(arguments, 1))
}
Function.prototype.selfCall = selfCall

var name = "刘德华"

function sayName(age) {
  this.age = age
  console.log(this)
}

const obj1 = {
  name: "周杰伦",
}

sayName(50)
sayName.selfCall(obj1, 30, 90)
