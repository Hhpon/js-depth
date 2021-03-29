/**
 * 测试bind函数是否能改变箭头函数的this指向
 */

function selfBind(context) {
  if (typeof this !== "function") {
    throw "不是函数"
  }

  const self = this
  const args = Array.prototype.slice.call(arguments, 1)

  const bound = function () {
    const finalArgs = Array.from(arguments).concat(args)
    if (this instanceof bound) {
      self.apply(this, finalArgs)
    } else {
      self.apply(context, finalArgs)
    }
  }

  function Empty() {}

  Empty.prototype = this.prototype
  bound.prototype = new Empty()

  return bound
}

Function.prototype.selfBind = selfBind

const andy = (name) => {
  this.name = name
  console.log(this)
}

function andy1(name) {
  this.name = name
  console.log(this)
}

const obj = {
  name: "张学友",
  sing: "吻别",
}

const obj1 = andy.bind(obj)
const obj11 = andy1.bind(obj)
const obj2 = andy.selfBind(obj)

obj1("张学友")
obj11("张学友")
obj2("张学友")
