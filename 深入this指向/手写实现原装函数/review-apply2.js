/**
 *
 * 2021-04-17复习基础
 * 1. args 如果是原始值该怎么办
 */

function isObject(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

function getGlobalObject() {
  return this
}

function getFunctionCode(argsLength) {
  const args = []
  for (let i = 0; i < argsLength; i++) {
    args.push("arguments[2][" + i + "]")
  }
  return "return arguments[0][arguments[1]](" + args.join(",") + ")"
}

/**
 *
 * @param {object} context
 * @param {any[]} args
 * @returns
 */
function selfApply(context, args) {
  if (typeof this !== "function") {
    throw new TypeError("context must be function")
  }
  if (context === undefined) {
    context = getGlobalObject()
  }
  if (!isObject(context)) {
    context = Object(context)
  }
  if (args == null) {
    args = []
  }
  if (typeof args !== "object") {
    throw new TypeError("args must be object")
  }

  const target = this
  const fn = "__" + new Date().getTime()
  // const hasOriginalVal = context.hasOwnProperty(fn)
  const hasOriginalVal = Object.prototype.hasOwnProperty.call(context, fn)
  const originalVal = context[fn]
  context[fn] = target

  // const result = context[fn](...args)
  console.log(getFunctionCode(args.length))
  const result = Function(getFunctionCode(args.length))(context, fn, args)

  delete context[fn]
  if (hasOriginalVal) {
    context[fn] = originalVal
  }
  return result
}

Function.prototype.selfApply = selfApply

function sayName(sing, movie) {
  this.sing = sing
  this.movie = movie
}

const person = {
  name: "刘德华",
}

sayName.selfApply(person)

console.log(person)
