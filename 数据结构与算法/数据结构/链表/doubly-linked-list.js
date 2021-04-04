const { DoublyNode } = require("../models/linked-list-models")
const defaultEquals = require("../util")
const LinkedList = require("./linked-list")

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = undefined
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head
      if (index === 0) {
        if (this.head == null) {
          this.head = node
          this.tail = node
        } else {
          node.next = current
          current.prev = node
          this.head = node
        }
      } else if (index === this.count) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        let previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = node
        node.prev = previous
        current.prev = node
        node.next = current
      }
      this.count++
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current.next
        if (this.count === 1) {
          this.tail = undefined
        } else {
          this.head.prev = undefined
        }
      } else if (index === this.count - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
        current.next.prev = previous
      }
      this.count--
      return current
    }
  }
}

module.exports = DoublyLinkedList

// const doublyLinkedList = new DoublyLinkedList()
// console.log(doublyLinkedList.toString())
// doublyLinkedList.insert("第一个元素", 0)
// console.log(doublyLinkedList.toString())
// doublyLinkedList.insert("最后一个元素", 1)
// console.log(doublyLinkedList.toString())
// doublyLinkedList.insert("在中间一个元素", 1)
// console.log(doublyLinkedList.toString())
// console.log(doublyLinkedList.removeAt(0))
// console.log(doublyLinkedList.toString())
// console.log(doublyLinkedList.removeAt(0))
// console.log(doublyLinkedList.toString())
// console.log(doublyLinkedList.removeAt(0))
// console.log(doublyLinkedList.toString())
// console.log(doublyLinkedList)
