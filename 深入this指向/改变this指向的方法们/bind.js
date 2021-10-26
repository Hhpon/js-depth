/***
 * bind 方法可以改变调用函数的this指向
 * const fun1 = fun.bind(target, arg1, arg2...)
 * 1. fun1 的this值指向target，fun1是一个函数
 * 2. 当fun1使用new调用的时候，fun1的this值指向新生成的实例
 */

function getGlobalObj() {
  return this
}

function isObject(target) {
  return target !== null && (typeof target == 'object' || typeof target == 'function')
}

function selfBind(target) {
  if (target == undefined) {
    target = getGlobalObj()
  }
  if (!isObject(target)) {
    throw new Error('target must be Object!')
  }
  const self = this
  const args = Array.prototype.slice.call(arguments, 1)
  const binder = function () {
    return self.apply(this instanceof binder ? this : target, args.concat(Array.prototype.slice.call(arguments, 0)))
  }

  // 原型链继承
  function Empty() { }
  Empty.prototype = self.prototype
  binder.prototype = new Empty()

  return binder
}

Function.prototype.selfBind = selfBind

var name = 'window'

const obj1 = {
  name: 'obj1'
}

// obj1.prototype.testProto = function () {
//   console.log('testProto');
// }

fun.prototype.getName = function () {
  console.log(this.name);
}

function fun() {
  this.age = 60
  console.log(this.name);
}

fun()

const fun1 = fun.selfBind(obj1)
const fun2 = fun.bind(obj1)

fun1()
fun2()

const obj2 = new fun1()
console.log(obj2);
