const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

/**
 * 问题一: 如此写法，resolve以及reject方法的this指向为xxx
 *
 */

class MyPromise {
  // 此处executor函数作为参数传入构造函数当中，在构造函数当中调用该方法。
  // 所以实例化Promise的时候他的代码属于同步执行
  constructor(executor) {
    this.status = PENDING
    this.value = null
    this.reason = null

    this.onFulfilledCallBacks = []
    this.onRejectedCallBacks = []

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(this.resolve.bind(this), this.reject.bind(this))
    }
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallBacks.forEach((fn) => fn())
      }
    })
  }

  reject(reason) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallBacks.forEach((fn) => fn())
      }
    })
  }

  then(onFulfilled, onRejected) {
    // console.log("执行then方法的时候status是" + this.status)
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err
          }

    if (this.status === FULFILLED) {
      let promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolutionProcedure(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      return promise2
    }
    if (this.status === REJECTED) {
      let promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolutionProcedure(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      return promise2
    }
    if (this.status === PENDING) {
      let promise2 = new MyPromise((resolve, reject) => {
        this.onFulfilledCallBacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallBacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      })
      return promise2
    }
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason
        })
    )
  }
}

/**
 * resolutionProcedure 函数即为根据x的值来决定promise2的状态的函数
 * x 是 promise2 = promise1.then(onFulfilled,onRejected)里onFulfilled/onRejected的返回值
 * **/

const resolutionProcedure = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise!"))
  }

  // 如果 x 为 promise
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(function (value) {
        resolutionProcedure(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }

  let called = false
  // 如果 x 是对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      // 2.3.3.1
      let then = x.then
      // 2.3.3.3
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            return resolutionProcedure(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            return reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      // 2.3.3.2
      if (called) return
      called = true
      return reject(error)
    }
  } else {
    // 2.3.3.4
    resolve(x)
  }
}

// const myPromise = new MyPromise((resolve, reject) => {
//   console.log(resolve)
//   setTimeout(() => {
//     resolve("ok.调用成功方法")
//   }, 1000)
// })
//   .then()
//   .then()
//   .then(
//     (res) => {
//       console.log(res)
//     },
//     (err) => {
//       console.log(err)
//     }
//   )

// const myPromise = new MyPromise((resolve, reject) => {
//   resolve()
// })

// console.log(myPromise.then())

// MyPromise.defer = MyPromise.deferred = function () {
//   let dfd = {}
//   dfd.promise = new MyPromise((resolve, reject) => {
//     dfd.resolve = resolve
//     dfd.reject = reject
//   })
//   return dfd
// }
// module.exports = MyPromise
