class Stack {
  constructor() {
    this.count = 0
    this.items = {}
  }
  push(element) {
    this.items[this.count++] = element
  }
  size() {
    return this.count
  }
  isEmpty() {
    return this.count === 0
  }
  pop() {
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peek() {
    return this.items[this.count - 1]
  }
  clear() {
    this.count = 0
    this.items = {}
  }
  toString() {
    if (this.isEmpty()) {
      return ""
    }
    const result = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      result += `,${this.items[i]}`
    }
    return result
  }
}

module.exports = Stack
