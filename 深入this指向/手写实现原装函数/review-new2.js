function newFun(ctor) {
  const newObj = Object.create(ctor.prototype)
  const result = ctor.call(newObj)
  return isObject(result) ? result : newObj
}

function isObject(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

function Foo() {
  return {}
}

Foo.prototype.say = function () {
  console.log("hi")
}

const foo1 = new Foo()
// foo1.say()

const foo2 = newFun(Foo)
foo2.say()
