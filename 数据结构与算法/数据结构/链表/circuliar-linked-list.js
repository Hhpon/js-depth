const { Node } = require("../models/linked-list-models")
const defaultEquals = require("../util")
const LinkedList = require("./linked-list")

class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      const node = new Node(element)
      if (index === 0) {
        if (this.isEmpty()) {
          this.head = node
          this.head.next = node
        } else {
          node.next = current
          let lasted = this.getElementAt(this.size() - 1)
          this.head = node
          lasted.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = node
        node.next = current
      }
    }
    this.count++
    return true
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined
        } else {
          this.head = current.next
          current = this.getElementAt(this.count - 1)
          current.next = this.head
        }
      } else {
        let previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current
    }
  }
}

const circularLinkedList = new CircularLinkedList()

console.log(circularLinkedList.insert("这是第一个元素", 0))
console.log(circularLinkedList.toString())
console.log(circularLinkedList.insert("这是最后一个元素", 1))
console.log(circularLinkedList.toString())
console.log(circularLinkedList.insert("这才是第一个元素", 0))
console.log(circularLinkedList.toString())
console.log(circularLinkedList.removeAt(1))
console.log(circularLinkedList.toString())
console.log(circularLinkedList.removeAt(0))
console.log(circularLinkedList.toString())
console.log(circularLinkedList.removeAt(0))
console.log("toString:" + circularLinkedList.toString())
