/**
 * Ctor 构造函数
 * return Ctor 的实例对象
 * @param {Object} Ctor
 * @return {}
 */
function newOperator(Ctor) {
  const newObject = Object.create(Ctor.prototype)
  const args = Array.prototype.slice.call(arguments, 1)
  const result = Ctor.apply(newObject, args)
  if (isObject(result)) {
    return result
  }
  return newObject
}

function isObject(obj) {
  return obj != null && (typeof obj === "object" || typeof obj === "function")
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