const Node = require("../models/linked-list-models")
const defaultEquals = require("../util")

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0
    this.head = null
    this.equalsFn = equalsFn
  }
  push(element) {
    const node = new Node(element)
    if (this.head == null) {
      this.head = node
    } else {
      let current = this.head
      while (current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }
  insert(element, index) {
    if (index < 0 || index > this.count) {
      return false
    }
    const node = new Node(element)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      let previous = this.getElementAt(index - 1)
      let current = previous.next
      node.next = current
      previous.next = node
    }
    return true
  }
  getElementAt(index) {
    if (index < 0 || index > this.count) {
      return
    }
    let node = this.head
    for (let i = 0; i < index && node != null; i++) {
      node = node.next
    }
    return node
  }
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }
  removeAt(index) {
    if (index < 0 || index > this.count) {
      return
    }
    let current = this.head
    if (index === 0) {
      this.head = current.next
    } else {
      const previous = this.getElementAt(index - 1)
      current = previous.next
      previous.next = current.next
    }
    this.count--
    return current.element
  }
  isEmpty() {
    return this.count === 0
  }
  size() {
    return this.count
  }
  toString() {
    if (this.head == null) {
      return ""
    }
    let result = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size(); i++) {
      result += `,${current.element}`
      current = current.next
    }
    return result
  }
}

module.exports = LinkedList

// const list = new LinkedList()

// console.log("push element 15")
// list.push(15)

// console.log("list.indexOf(15) => ", list.indexOf(15))

// console.log("push element 10")
// list.push(10)

// console.log("list.toString() => ", list.toString())
// console.log("list.indexOf(10) => ", list.indexOf(10))

// console.log("push element 13")
// list.push(13)

// console.log("list.toString() => ", list.toString())
// console.log("list.indexOf(13) => ", list.indexOf(13))
// console.log("list.indexOf(10) => ", list.indexOf(10))

// console.log("push elements 11 and 12")
// list.push(11)
// list.push(12)

// console.log("list.toString() => ", list.toString())
// console.log("list.removeAt(1) => ", list.removeAt(1))
// console.log("list.toString() => ", list.toString())
// console.log("list.removeAt(3) => ", list.removeAt(3))
// console.log("list.toString() => ", list.toString())

// console.log("push element 14")
// list.push(14)

// console.log("list.toString() => ", list.toString())
// console.log("insert element 16 pos 0 => ", list.insert(16, 0))
// console.log("list.toString() => ", list.toString())
// console.log("insert element 17 pos 1 => ", list.insert(17, 1))
// console.log("list.toString() => ", list.toString())
// console.log("insert element 18 pos list.size() => ", list.insert(18, list.size()))
// console.log("list.toString() => ", list.toString())
// console.log("remove element 16 => ", list.remove(16))
// console.log("list.toString() => ", list.toString())
// console.log("remove element 11 => ", list.remove(11))
// console.log("list.toString() => ", list.toString())
// console.log("remove element 18 => ", list.remove(18))
// console.log("list.toString() => ", list.toString())
