const a = Symbol("a")

console.log(a)

// console.log(Symbol.prototype.valueOf(a))

console.log(a.valueOf())

console.log(Object(a.valueOf()))

const b = Object(a)

console.log(b.valueOf())

