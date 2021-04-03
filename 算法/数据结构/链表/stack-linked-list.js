const DoublyLinkedList = require("./doubly-linked-list")

class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList()
  }
  push(element) {
    this.items.insert(element, this.items.count)
  }
  pop() {
    return this.items.removeAt(this.items.count - 1)
  }
  peek() {
    return this.items.tail
  }
  isEmpty() {
    return this.items.isEmpty()
  }
  size() {
    return this.items.size()
  }
  clear() {
    this.items.clear()
  }
  toString() {
    return this.items.toString()
  }
}

const stackLinkedList = new StackLinkedList()

console.log(stackLinkedList.peek())
