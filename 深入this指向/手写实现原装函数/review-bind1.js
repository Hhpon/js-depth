function selfBind(context) {
  const self = this
  const args = Array.prototype.slice.call(arguments, 1)
  const bound = function () {
    if (this instanceof bound) {
      const result = self.apply(this, args.concat(Array.prototype.slice.call(arguments)))
      return isObject(result) ? result : this
    } else {
      return self.apply(context, args.concat(Array.prototype.slice.call(arguments)))
    }
  }
  /**
   * 如此定义bound的原型的话，我们可以通过改变bind()返回值的原型改变this/self的原型
   * 为了解决这个问题我们可以使用一个中间变量
   */
  // bound.prototype = this.prototype

  /**
   * 这样就解除了bound与self/this方法的耦合
   *
   * 我们在设置原型的时候还应该考虑一个问题，那就是箭头函数是没有原型的，所以我们在设置原型的时候应该加以校验，查看当前函数是否存在原型对象。
   */
  function Empty() {}

  if (this.prototype) {
    Empty.prototype = this.prototype
    bound.prototype = new Empty()
    Empty.prototype = null
  }

  return bound
}

function isObject(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

Function.prototype.selfBind = selfBind

Andy.prototype.name = "刘德华"

function Andy() {
  return "123"
}

const andy = new Andy()

console.log("andy", andy.name)

const Andy1 = Andy.selfBind()

const andy1 = new Andy1()
console.log("andy1", andy1.name)

Andy1.prototype.name = "张学友"

console.log("andy", andy.name)
console.log("andy1", andy1.name)
