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
      executor(this.wresolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onFulfilledCallBacks.forEach((fn) => fn())
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallBacks.forEach((fn) => fn())
    }
  }

  then(onFulfilled, onRejected) {
    console.log("执行then方法的时候status是" + this.status)
    onFulfilled = typeof onFulfilled
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === PENDING) {
      this.onFulfilledCallBacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallBacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"))
  }

  let called

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  console.log(resolve)
  setTimeout(() => {
    resolve("ok.调用成功方法")
  }, 1000)
}).then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)

// const myPromise = new MyPromise((resolve, reject) => {
//   resolve()
// })
