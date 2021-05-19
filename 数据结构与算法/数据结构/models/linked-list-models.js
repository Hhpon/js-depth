class Node {
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next)
    this.prev = prev
  }
}

module.exports = { Node, DoublyNode }
