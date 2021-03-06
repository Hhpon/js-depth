const resolvedProm = new Promise((resolve, reject) => {
  console.log("promise then start")
  return resolve(3)
})

// 代码执行到这个位置的时候会执行这个promise的函数。只是回调函数要等到主线程的任务都执行完毕才会执行
let thenProm = resolvedProm.then(null, (err) => {
  console.log(err)
  return err
})

thenProm
  .then((res) => {
    console.log("resolve")
    console.log(res)
  })
  .catch((err) => {
    console.log("reject")
    console.log(err)
  })

console.log(thenProm)

setTimeout(() => {
  console.log(thenProm)
})
