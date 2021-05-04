function isObject(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

function getGlobalObject() {
  return this
}

function getDefaultArgs() {
  return []
}

function getFunctionCode(argsLength) {
  const argsArr = []
  for (let i = 0; i < argsLength; i++) {
    argsArr.push(`arguments[2][${i}]`)
  }
  return `return arguments[0][arguments[1]](${argsArr.join(",")}) `
}

function selfApply(context, args) {
  if (typeof this !== "function") {
    throw new TypeError("this must be function")
  }
  if (typeof context === "undefined") {
    context = getGlobalObject()
  }
  if (typeof args === "undefined") {
    args = getDefaultArgs()
  }
  if (typeof args !== "object") {
    throw new TypeError("must be array")
  }
  context = Object(context)
  const fn = "__" + new Date().getTime()
  const hasOriginalVal = Object.prototype.hasOwnProperty.call(context, fn)
  // const hasOriginalVal = context.hasOwnProperty(fn)
  let originalVal
  if (hasOriginalVal) {
    originalVal = context[fn]
  }
  context[fn] = this
  // const result = context[fn](...args)
  const result = new Function(getFunctionCode(args.length))(context, fn, args)
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

sayName.selfApply(person, ["冰雨", "无间道"])

console.log(person)
