const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPromise {
  constructor(except) {
    this.status = PENDING

    this.value = null
    this.reason = null

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    try {
      except(this.resolve.bind(this), this.reject.bind(this))
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
        this.onFulfilledCallbacks.forEach((fn) => fn())
      }
    })
  }

  reject(reason) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    })
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error
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
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
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
}

const resolutionProcedure = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise!"))
  }

  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then((value) => {
        resolutionProcedure(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
  }

  let called = false
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then
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
      if (called) return
      called = true
      return reject(error)
    }
  } else {
    resolve(x)
  }
}

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("返回成功状态")
//     resolve("ok")
//   }, 1000)
// })
//   .then((res) => {
//     return "增加" + res
//   })
//   .then((res) => {
//     console.log("then start")
//     console.log(res)
//   })

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = MyPromise
