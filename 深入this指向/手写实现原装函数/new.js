/**
 * new 关键字会进行如下操作
 *  1. 创建一个空的简单JavaScript对象(即{})
 *  2. 链接该对象(设置该对象的constructor)到另一个对象
 *  3. 将步骤1新创建的对象作为this的上下文
 *  4. 如果该函数没有返回对象，则返回this
 */

function newOperator(ctor) {
  if (typeof ctor !== "function") {
    throw "newOperator function the first param must be a function"
  }

  newOperator.target = ctor

  var newObj = Object.create(ctor.prototype)
  var newArgs = Array.prototype.slice.call(arguments, 1)

  var result = ctor.apply(newObj, newArgs)

  if (result != null && (typeof result === "object" || typeof result === "function")) {
    return result
  }

  return newObj
}

function Andy(name = "mac") {
  this.name = name
}

Andy.prototype.sayName = function () {
  console.log(this.name)
}

const andy = new Andy()

const newAndy = newOperator(Andy, "刘德华")

console.log(andy)
andy.sayName()

console.log(newAndy)
newAndy.sayName()
