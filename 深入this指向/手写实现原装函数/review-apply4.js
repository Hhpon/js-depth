/**
 * Function.prototype.apply(context, args)
 * 
 * 功能测试：
 * 1. 以第一个参数context作为函数的this指向执行该函数
 * 2. 第二个参数为类数组参数
 * 
 * 边界测试/反面测试：
 * 1. context = undefind 时默认替换成全局对象
 * 2. typeof context != object Object(context)
 * 3. typeof this != function throw new Error()
 * 4. typeof args == undefined args = []
 * 5. typeof args != object throw new Error()
 * 
 */

function getGlobalObject() {
  return this
}

function isObject(obj) {
  return obj !== null && (typeof obj === 'function' || typeof obj === 'object')
}

function getFunctionCode(argsLength) {
  const argsArr = []
  for (let i = 0; i < argsLength; i++) {
    argsArr.push(`arguments[2][${i}]`)
  }
  return `return arguments[0][arguments[1]](${argsArr.join(',')})`
}

function selfApply(context, args) {
  if (typeof this === 'undefined') {
    throw new Error(this + ' must be function!')
  }
  if (context == undefined || context == null) {
    context = getGlobalObject()
  }
  if (!isObject(context)) {
    context = Object(context)
  }
  if (args == undefined || args == null) {
    args = []
  }
  if (typeof args != 'object') {
    throw new Error(args + ' must be array')
  }
  context.fn = this
  return new Function(getFunctionCode(args.length))(context, 'fn', args)
}

Function.prototype.selfApply = selfApply

console.log('============= one =============')

function printUserInfo() {
  console.log(this.name)
  console.log(this.age)
}

const user = { name: 'andy', age: 50 }

printUserInfo.selfApply(user)

console.log('============= two =============')

function printUserInfo1() {
  console.log(this.name)
  console.log(this.age)
}

window.name = '梁朝伟'
window.age = 60

const user1 = { name: '刘德华', age: 50 }

printUserInfo1.selfApply()

console.log('============= three =============')

function printUserInfo2(height) {
  this.height = height
  console.log(this.name)
  console.log(this.age)
  console.log(this.height)
}

window.name = '梁朝伟'
window.age = 60

const user2 = { name: '刘德华', age: 50 }

printUserInfo2.selfApply(user2, [180])

console.log('============= four =============')

function printUserInfo3(height) {
  this.height = height
  console.log(this.name)
  console.log(this.age)
  console.log(this.height)
}

window.name = '梁朝伟'
window.age = 60

const user3 = { name: '刘德华', age: 50 }

printUserInfo3.selfApply(1, [180])

console.log('============= five =============')

function printUserInfo4(height) {
  this.height = height
  console.log(this.name)
  console.log(this.age)
  console.log(this.height)
}

window.name = '梁朝伟'
window.age = 60

const user4 = { name: '刘德华', age: 50 }

// printUserInfo4.selfApply(user4, 180)
user4.selfApply()
