const p = new Promise((resolve, reject) => {
  const time = new Date().getTime()
  console.log(time)
  if (time % 2 === 0) {
    resolve(time)
  } else {
    reject(time)
  }
})

// const p1 = p.then(
//   (res) => {
//     console.log(res)
//     // return Promise.reject("等待之后成功啦")
//     return new Promise((resolve) => {
//       resolve("等待之后成功啦")
//     })
//   },
//   (err) => {
//     console.log(err)
//   }
// )

const p1 = p.then()

setTimeout(() => {
  console.log(p1)
  p1.then(
    (result) => {
      console.log("promise状态是:成功 " + result)
    },
    (err) => {
      console.log("promise状态是:失败 " + err)
    }
  )
}, 0)
