const { defaultCompare, defaultEquals, Compare } = require("../util")
const LinkedList = require("./linked-list")

class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn)
    this.compareFn = compareFn
  }

  insert(element, index = 0) {
    if (this.isEmpty()) {
      super.insert(element, 0)
      return
    }
    index = this.getIndexNextSortedElement(element)
    super.insert(element, index)
  }

  getIndexNextSortedElement(element) {
    let current = this.head
    for (let i = 0; i < this.size(); i++) {
      if (this.compareFn(element, current.element) === Compare.LESS_THAN) {
        return i
      }
      current = current.next
    }
    return this.count
  }
}
