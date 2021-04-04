const Queue = require("./queue")

/**
 *
 * @param {[]} elementList
 * @param {number} num
 */
function hotPotato(elementList, num) {
  const queue = new Queue()

  elementList.forEach((ele) => queue.enqueue(ele))

  while (queue.size > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    console.log(queue.dequeue())
  }

  return {
    winner: queue.dequeue(),
  }
}

const names = ["John", "Jack", "Camila", "Ingrid", "Carl"]

console.log(hotPotato(names, 7))
