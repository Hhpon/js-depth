const { swap } = require("../排序算法/utils")

function shuffle(array) {
  let randomIndex
  for (let i = array.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1))
    swap(array, randomIndex, i)
  }
  return array
}

const arr = [1, 2, 3, 4, 5]
console.log(shuffle(arr))
