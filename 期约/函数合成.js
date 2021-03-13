function addTwo(x) {
  console.log(x)
  return x + 2
}

function addThree(x) {
  console.log(x)
  return x + 3
}

function addFive(x) {
  console.log(x)
  return x + 5
}

// function addTen(x) {
//   return addFive(addTwo(addThree(x)))
// }

// function addTen(x) {
//   return Promise.resolve(x).then(addTwo).then(addThree).then(addFive)
// }

// function addTen(x) {
//   return [addTwo, addThree, addFive].reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
// }

// function addTen(x) {
//   return [addTwo, addThree, addFive].reduce((promise, fn) => {
//     console.log("promise:" + promise)
//     console.log("fn:" + fn)
//     return promise.then(fn), Promise.resolve(x)
//   })
// }

// console.log(addTen(7))
// addTen(8).then(console.log)

// 提炼通用函数

function compose(...fns) {
  return (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
}

let addTen = compose(addTwo, addThree, addFive)

addTen(8).then(console.log)
