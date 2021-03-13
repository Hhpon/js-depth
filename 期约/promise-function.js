function all(iterable) {
  const result = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < iterable.length; i++) {
      if (iterable[i] instanceof Promise) {
        iterable[i]
          .then((res) => {
            result.push(res)
            if (i === iterable.length - 1) {
              resolve(result)
            }
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        result.push(iterable[i])
        if (i === iterable.length - 1) {
          resolve(result)
        }
      }
    }
  })
}

function allSettled(iterable) {
  const result = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < iterable.length; i++) {
      if (iterable[i] instanceof Promise) {
        iterable[i]
          .then((res) => {
            result.push(res)
          })
          .catch((err) => {
            result.push(err)
          })
          .finally(() => {
            if (i === iterable.length - 1) {
              resolve(result)
            }
          })
      } else {
        result.push(iterable[i])
        if (i === iterable.length - 1) {
          resolve(result)
        }
      }
    }
  })
}

const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo")
})
const promise4 = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, "输出拒绝理由")
})

allSettled([promise1, promise2, promise3, promise4])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

all([promise1, promise2, promise3, promise4])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
