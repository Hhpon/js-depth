function getGlobal() {
  return this
}

function isObject(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

function selfBind(context) {
  if (typeof this !== "function") {
    return new TypeError("must be function")
  }
  if (typeof context === "undefined") {
    context = getGlobal()
  }
  const self = this
  const args = Array.prototype.slice.call(arguments, 1)
  let bound
  const binder = function () {
    if (this instanceof bound) {
      const result = self.apply(this, args.concat(Array.prototype.slice.call(arguments)))
      return isObject(result) ? result : this
    } else {
      return self.apply(context, args.concat(Array.prototype.slice.call(arguments)))
    }
  }

  const boundLength = Math.max(0, self.length - args.length)
  const boundArgs = []

  for (let i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i)
  }

  bound = new Function("binder", "return function(" + boundArgs.join(",") + ") { return binder.apply(this,arguments) }")(binder)

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

function Person(age, name) {
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

console.log(PersonBind.length)

const PersonBind1 = Person.bind(andy)
const person1 = new PersonBind1(20)
console.log(person1)
person1.sayAge()

console.log(PersonBind1.length)
