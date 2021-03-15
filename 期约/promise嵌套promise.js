const p1 = new Promise(function (resolve, reject) {
  console.log("p1 start")
  setTimeout(() => {
    console.log("p1 settimeout start")
    reject(new Error("fail"))
    console.log("p1 settimeout end")
  }, 3000)
  console.log("p1 end")
})

const p2 = new Promise(function (resolve, reject) {
  console.log("p2 start")
  setTimeout(() => {
    console.log("p2 settimeout start")
    resolve(p1)
    console.log("p2 settimeout end")
  }, 1000)
  console.log("p2 end")
})

const p2 = Promise.resolve(p1)

p2.then((result) => console.log(result)).catch((err) => console.log(err))
