/**
 * 2021-08-09
 * bind 应用方法
 * Function.Prototype.bind(target,args...)
 * 功能测试：
 * 1. 生成一个以target对象为this的函数func()
 * 2. func()有两种调用方式，直接调用、用new操作符调用
 * 
 * 边界测试/反面测试：
 * 1. typeof target === undefined
 * 2. !isObject(target) target 不是一个对象
 * 3. 非函数调用了这个方法
 */

const getGlobalObject = () => {
  return this
}

const isObject = (obj) => {
  return obj !== null && (typeof obj === 'function' || typeof obj === 'object')
}

function selfBind(target) {
  console.log(typeof this)
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind called on incompatiple' + target)
  }
  if (typeof target === 'undefined') {
    target = getGlobalObject()
  }

  const self = this
  const args = Array.prototype.slice.call(arguments, 1)

  const bound = function () {
    const boundArgs = Array.prototype.slice.call(arguments)
    const finalArgs = args.concat(boundArgs)
    if (this instanceof bound) {
      if (self.prototype) {
        function Empty() { }
        Empty.prototype = target.prototype
        bound.prototype = new Empty()
        Empty = null
      }
      const result = self.apply(this, finalArgs)
      return isObject(result) ? result : this
    } else {
      return self.apply(target, finalArgs)
    }
  }

  return bound
}

Function.prototype.selfBind = selfBind

const obj = {
  name: 'hhp'
}

function original(a, b) {
  console.log(this.name)
  console.log([a, b])
  return false
}

const bound = original.bind(obj, 1)
bound(2)

const bound1 = original.selfBind(obj, 3)
bound1(4)