class Deque {
  constructor() {
    this.lowestCount = 0
    this.count = 0
    this.items = {}
  }
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element)
      return
    }
    if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.lowestCount; i < this.count; i++) {
        this.items[i + 1] = this.items[i]
      }
      this.items[this.lowestCount] = element
      this.count++
    }
  }
  addBack(element) {
    this.items[this.count] = element
    this.count++
  }
  removeFront() {
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  removeBack() {
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peekFront() {
    return this.items[this.lowestCount]
  }
  peekBack() {
    return this.items[this.count]
  }
  isEmpty() {
    return this.count - this.lowestCount === 0
  }
  clear() {
    this.lowestCount = 0
    this.count = 0
    this.items = {}
  }
  size() {
    return this.count - this.lowestCount
  }
  toString() {
    let result = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      result += `,${this.items[i]}`
    }
    return result
  }
}

module.exports = Deque

// const deque = new Deque()

// console.log(deque.isEmpty())
// deque.addBack("John")
// deque.addBack("Jack")
// console.log(deque.toString())
// deque.addBack("Camila")
// console.log(deque.toString())
// console.log(deque.size())
// console.log(deque.isEmpty())
// deque.removeFront()
// console.log(deque.toString())
// deque.removeBack()
// console.log(deque.toString())
// deque.addFront("John")
// console.log(deque.toString())
