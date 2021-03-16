// 三种状态
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"
function MyPromise(callback) {
  var _this = this
  _this.currentState = PENDING // Promise当前的状态
  _this.value = void 0 // Promise的值
  // 用于保存 then 的回调， 只有当 promise
  // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.onResolvedCallbacks = [] // Promise resolve时的回调函数集
  _this.onRejectedCallbacks = [] // Promise reject时的回调函数集
  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      // 如果 value 是个 Promise， 递归执行
      return value.then(_this.resolve, _this.reject)
    }
    setTimeout(() => {
      // 异步执行，保证顺序执行
      if (_this.currentState === PENDING) {
        _this.currentState = FULFILLED // 状态管理
        _this.value = value
        _this.onResolvedCallbacks.forEach((cb) => cb())
      }
    })
  } // resolve 处理函数
  _this.reject = function (value) {
    setTimeout(() => {
      // 异步执行，保证顺序执行
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED // 状态管理
        _this.value = value
        _this.onRejectedCallbacks.forEach((cb) => cb())
      }
    })
  } // reject 处理函数

  // 异常处理
  // new Promise(() => throw Error('error'))
  try {
    callback(_this.resolve, _this.reject) // 执行callback并传入相应的参数
  } catch (e) {
    _this.reject(e)
  }
}
// then 方法接受两个参数，onFulfilled，onRejected，分别为Promise成功或失败的回调
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var _this = this
  // 规范 2.2.7，then 必须返回一个新的 promise
  var promise2
  // 根据规范 2.2.1 ，onFulfilled、onRejected 都是可选参数
  // onFulfilled、onRejected不是函数需要忽略，同时也实现了值穿透
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (error) => {
          throw error
        }

  if (_this.currentState === FULFILLED) {
    // 如果promise1（此处为self/this）的状态已经确定并且为fulfilled，我们调用onFulfilled
    // 如果考虑到有可能throw，所以我们将其包在try/catch块中
    return (promise2 = new MyPromise(function (resolve, reject) {
      try {
        var x = onFulfilled(_this.value)
        // 如果 onFulfilled 的返回值是一个 Promise 对象，直接取它的结果作为 promise2 的结果
        resolutionProcedure(promise2, x, resolve, reject)
      } catch (err) {
        reject(err) // 如果出错，以捕获到的错误作为promise2的结果
      }
    }))
  }
  // 此处实现与FULFILLED相似，区别在使用的是onRejected而不是onFulfilled
  if (_this.currentState === REJECTED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      try {
        var x = onRejected(_this.value)
        resolutionProcedure(promise2, x, resolve, reject)
      } catch (err) {
        reject(err)
      }
    }))
  }
  if (_this.currentState === PENDING) {
    // 如果当前的Promise还处于PENDING状态，我们并不能确定调用onFulfilled还是onRejected
    // 只有等待Promise的状态确定后，再做处理
    // 所以我们需要把我们的两种情况的处理逻辑做成callback放入promise1（此处即_this/this）的回调数组内
    // 处理逻辑和以上相似
    return (promise2 = new MyPromise(function (resolve, reject) {
      _this.onResolvedCallbacks.push(function () {
        try {
          var x = onFulfilled(_this.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
      _this.onRejectedCallbacks.push(function () {
        try {
          var x = onRejected(_this.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    }))
  }

  // 规范 2.3
  /*
    resolutionProcedure函数即为根据x的值来决定promise2的状态的函数
    也即标准中的[Promise Resolution Procedure](https://promisesaplus.com/#point-47)
    x 为 promise2 = promise1.then(onFulfilled, onRejected)里onFulfilled/onRejected的返回值
    resolve 和 reject 实际上是 promise2 的executor的两个实参，因为很难挂在其他地方，所以一并传过来。
    相信各位一定可以对照标准转换成代码，这里就只标出代码在标准中对应的位置，只在必要的地方做一些解释。
    */
  function resolutionProcedure(promise2, x, resolve, reject) {
    // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
    if (promise2 === x) {
      return reject(new TypeError("Chaining cycle detected for promise!"))
    }
    // 规范 2.3.2
    // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
    if (x instanceof MyPromise) {
      // 2.3.2.1 如果x为pending状态，promise必须保持pending状态，直到x为fulfilled/rejected
      if (x.currentState === PENDING) {
        x.then(function (value) {
          // 再次调用该函数是为了确认 x resolve 的
          // 参数是什么类型，如果是基本类型就再次 resolve
          // 把值传给下个 then
          resolutionProcedure(promise2, value, resolve, reject)
        }, reject)
      } else {
        // 但如果这个promise的状态已经确定了，那么它肯定有一个正常的值，而不是一个thenable，所以这里可以取它的状态
        x.then(resolve, reject)
      }
      return
    }

    let called = false
    // 规范 2.3.3，判断 x 是否为对象或函数
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      // 规范 2.3.3.2，如果不能取出 then，就 reject
      try {
        // 规范2.3.3.1 因为x.then可能是一个getter，这种情况下多次读取就有可能产生副作用
        // 既要判断它的类型，又要调用它，这就是两次读取
        let then = x.then
        // 规范2.3.3.3，如果 then 是函数，调用 x.then
        if (typeof then === "function") {
          // 规范 2.3.3.3
          // reject 或 reject 其中一个执行过的话，忽略其他的
          then.call(
            x,
            (y) => {
              // 规范 2.3.3.3.1
              if (called) return // 规范 2.3.3.3.3，即这三处谁先执行就以谁的结果为准
              called = true
              // 规范 2.3.3.3.1
              return resolutionProcedure(promise2, y, resolve, reject)
            },
            (r) => {
              if (called) return // 规范 2.3.3.3.3，即这三处谁先执行就以谁的结果为准
              called = true
              return reject(r)
            }
          )
        } else {
          // 规范 2.3.3.4
          resolve(x)
        }
      } catch (e) {
        // 规范 2.3.3.2
        if (called) return // 规范 2.3.3.3.3，即这三处谁先执行就以谁的结果为准
        called = true
        return reject(e)
      }
    } else {
      // 规范 2.3.4，x 为基本类型
      resolve(x)
    }
  }
}
// catch 的实现
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
// finally 的实现
MyPromise.prototype.finally = function (callback) {
  return this.then(
    function (value) {
      return MyPromise.resolve(callback()).then(function () {
        return value
      })
    },
    function (err) {
      return MyPromise.resolve(callback()).then(function () {
        throw err
      })
    }
  )
}
// race
MyPromise.race = function (values) {
  return new MyPromise(function (resolve, reject) {
    values.forEach(function (value) {
      MyPromise.resolve(value).then(resolve, reject)
    })
  })
}
// all
MyPromise.all = function (arr) {
  var args = Array.prototype.slice.call(arr)
  return new MyPromise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length
    for (var i = 0; i < args.length; i++) {
      res(i, args[i])
    }
    function res(i, val) {
      if (val && (typeof val === "object" || typeof val === "function")) {
        if (val instanceof MyPromise && val.then === MyPromise.prototype.then) {
          if (val.currentState === FULFILLED) return res(i, val.value)
          if (val.currentState === REJECTED) reject(val.value)
          val.then(function (val) {
            res(i, val)
          }, reject)
          return
        } else {
          var then = val.then
          if (typeof then === "function") {
            var p = new MyPromise(then.bind(val))
            p.then(function (val) {
              res(i, val)
            }, reject)
            return
          }
        }
      }
      args[i] = val
      if (--remaining === 0) {
        resolve(args)
      }
    }
  })
}
// allSettled
MyPromise.allSettled = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : []
    let len = promises.length
    const argslen = len
    if (len === 0) return resolve([])
    let args = Array.prototype.slice.call(promises)
    function resolvePromise(index, value) {
      // 判断传入的是否是object
      if (typeof value === "object") {
        const then = value.then
        if (typeof then === "function") {
          then.call(
            value,
            function (val) {
              args[index] = { status: FULFILLED, value: val }
              if (--len === 0) {
                resolve(args)
              }
            },
            function (e) {
              args[index] = { status: REJECTED, reason: e }
              if (--len === 0) {
                reject(args)
              }
            }
          )
        }
      }
    }

    for (let i = 0; i < argslen; i++) {
      resolvePromise(i, args[i])
    }
  })
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = MyPromise