const obj = {
  name: "Willige",
}

function test(name, age) {
  console.log("name:" + name)
  console.log("age:" + age)
  console.log("this.name:" + this.name)
  this.name = name
  this.age = age
  console.log("this.name:" + this.name)
  console.log("this.age:" + this.age)
}

/**
 * 
 * @param {*} obj 
 * @param  {...any} arg1 
 * @returns 
 * 当函数作为构造函数使用的时候 this 指向当前函数
 * 当函数执行的时候才会指向调用这个函数的包含上下文
 */
Function.prototype.selfBind = function (obj, ...arg1) {
  const self = this
  const fn = function () {
    self.apply(this instanceof fn ? this : obj, arg1.concat(Array.prototype.slice.call(arguments)))
  }
  return fn
}

const newSelfTest = test.selfBind(obj)

// newSelfTest()

const testObj = new newSelfTest("hhp", 25)

console.log(testObj)
