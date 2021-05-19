/**
 *
 * 熟悉原型链 以及__proto__属性
 */

function Person() {}

console.log(Person)
console.log(Array.__proto__ === Function.prototype)
console.log(Array.prototype.__proto__ === Object.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)
console.log(Array instanceof Object)
console.log(Function.prototype)
console.log(Object.prototype)
