let p1 = new Promise(() => {})
let p2 = p1.then()
// let p3 = Promise.resolve("foo")
// let p4 = p3.then(() => Promise.resolve("resolve"))

console.log(p1)
setTimeout(console.log, 0, p2)
// console.log(p3)
// setTimeout(console.log, 0, p4)

// Promise.prototype.then() 方法返回一个新的期约实例，then方法在Promise返回一个值的情况下会使用Promise.resolve()包装这个返回值。否则会包装上一个期约函数的返回值。
