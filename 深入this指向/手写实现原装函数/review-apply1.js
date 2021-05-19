function getGlobalObject() {
  return this
}

function selfApply(context, args) {
  if (typeof this !== "function") {
    throw new TypeError("must be function")
  }
  if (typeof args === "undefined" || args === null) {
    args = []
  }
  if (typeof args !== "object") {
    throw new TypeError("args must be object")
  }
  if (typeof context === "undefined" || context === null) {
    context = getGlobalObject()
  }
  context = new Object(context)
  const fn = "__" + new Date().getTime()
  const hasOriginalVal = context.hasOwnProperty(fn)
  const originalVal = hasOriginalVal ? context[fn] : null
  context[fn] = this
  // 此处需要保证可以使用解构赋值

  // const result = context[fn](...args)
  const result = new Function(getFunctionCode(args.length))(context, fn, args)
  delete context[fn]
  if (hasOriginalVal) {
    context[fn] = originalVal
  }
  return result
}

function getFunctionCode(argsLength) {
  let code = "arguments[0][arguments[1]]("
  for (let i = 0; i < argsLength; i++) {
    if (i > 0) {
      code += ","
    }
    code += "arguments[2][" + i + "]"
  }
  code += ")"
  return code
}

Function.prototype.selfApply = selfApply

var name = "刘德华"
const name1 = "梁朝伟"
let name2 = "刘嘉玲"

function sayName(age) {
  this.age = age
  console.log(this)
}

const obj1 = {
  name: "周杰伦",
}

sayName()
sayName.apply(obj1, [20])
sayName.apply("name: testString")

sayName.selfApply(obj1, [20])
// 当selfApply args 参数为undefined的时候，上述方法就会报错length找不到
sayName.selfApply("name: testString")
