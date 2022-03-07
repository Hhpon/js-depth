/* *
       实现一个同时允许任务数量最大为n的函数
       使用Promise封装，给你一个数组，数组的每一项是一个Promise对象
           *
           */

const p1 = function pfn3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("111")
    }, 2000)
  })
}

const p2 = function pfn3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("222")
    }, 2000)
  })
}

const p3 = function pfn3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("333")
    }, 2000)
  })
}

function limitPromiseQueue(promiseList, limit) {
  return new Promise((resolve, reject) => {
    let i = 0
    const result = []
    let resultCount = 0

    for (let i = 0; i < limit; i++) {
      doit()
    }

    function doit() {
      const fn = promiseList[i]
      i++
      fn().then((res) => {
        result.push(res)
        resultCount++
        if (i < promiseList.length) {
          doit()
        }
        if (resultCount == promiseList.length) {
          resolve(result)
        }
      })
    }
  })
}

//两秒后输出111,222       再过两秒输出333
limitPromiseQueue([p1, p2, p3], 2).then((res) => {
  console.log(res) //['111','222','333']
})

function limitPromiseQueue(promiseList, limit) {
  return new Promise((resolve) => {
    const result = []
    let currentPromise, currentIndex
    let i = 0,
      count = 0
    function doit() {
      currentPromise = promiseList[i]
      currentIndex = i
      i++
      currentPromise
        .then((res) => {
          count++
          result[i] = res
        })
        .catch((err) => {
          result[i] = err
        })
        .finally(() => {
          if (i < promiseList.length) {
            doit()
          }
          if (count === promiseList.length) {
            resolve(result)
          }
        })
    }

    for (let i = 0; i < limit; i++) {
      doit()
    }
  })
}

function limitPromiseQueue(promiseList, limit) {
  return new Promise((resolve, reject) => {
    let i = 0
    let count = 0
    const result = []
    let fn, currentIndex

    for (let j = 0; j < limit; j++) {
      doit()
    }

    function doit() {
      fn = promiseList[i]
      currentIndex = i
      i++
      fn.then((res) => {
        count++
        result[currentIndex] = res
        if (i < promiseList.length) {
          doit()
        } else if (count === promiseList.length) {
          resolve(result)
        }
      })
    }
  })
}
