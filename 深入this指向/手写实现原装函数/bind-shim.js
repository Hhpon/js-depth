/**
 * 学习es5-shim的bind方法
 */

function selfBind(that) {
  var target = this

  if (typeof target !== "function") {
    throw new Error("Function.prototype.bind called on incompatible" + target)
  }

  var args = Array.prototype.slice.call(arguments, 1)

  var bound
  var binder = function () {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(Array.prototype.slice.call(arguments)))
      if (Object(result) === result) {
        return result
      }
      return this
    } else {
      return target.apply(that, args.concat(Array.prototype.slice.call(arguments)))
    }
  }
  var boundLength = Math.max(0, target.length - args.length)

  var boundArgs = []
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i)
  }

  bound = Function("binder", "return function (" + boundArgs.join(",") + "){return binder.apply(this,arguments);}")(binder)
  const Empty = function () {}

  if (target.prototype) {
    Empty.prototype = target.prototype
    bound.prototype = new Empty()
    Empty.prototype = null
  }

  return bound
}

module.exports = selfBind
