function selfBind() {}

Function.prototype.selfBind = selfBind

function andy(name) {
  this.name = name
  console.log(this)
}

const obj = {
  name: "张学友",
  sing: "吻别",
}

andy.prototype.sayName = function () {
  console.log(this.name)
}

const obj1 = andy.bind(obj)
const obj2 = andy.selfBind(obj)

console.log('=======================  obj1 Start  =====================');
obj1("张学友")
try {
  obj1.sayName()
} catch (error) {
  console.log(error)
}
console.log(obj1.length)
console.log(obj1.name)
console.log('=======================  obj1 End  =====================');

const person1 = new obj1("周华健")
const person2 = new obj2("周华健")

try {
  person1.sayName()
} catch (error) {
  console.log(error)
}
