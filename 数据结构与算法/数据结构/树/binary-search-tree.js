const { Node } = require("../models/node")
const { defaultCompare, Compare } = require("../util")

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }

  /**
   *
   * @param {number} key
   */
  insert(key) {
    if (this.root === null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  /**
   *
   * @param {Node} node
   * @param {number} key
   */
  insertNode(node, key) {
    if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
      // key 更大，放到右边
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    } else {
      // 放左边
      if (node.left === null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    }
  }

  /**
   *
   * @param {function} callback
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  /**
   *
   * @param {Node} node
   * @param {function} callback
   */
  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  /**
   *
   * @param {Node} node
   * @param {*} callback
   */
  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }

  /**
   *
   * @param {Node}} node
   * @param {*} callback
   */
  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  min() {
    this.minNode(this.root)
  }

  /**
   *
   * @param {Node} node
   */
  minNode(node) {
    let current = node
    while (current !== null && current.left !== null) {
      current = current.left
    }
    return current
  }

  max() {
    this.maxNode(this.root)
  }

  /**
   *
   * @param {Node} node
   * @returns
   */
  maxNode(node) {
    let current = node
    while (current !== null && current.right !== null) {
      current = current.right
    }
    return current
  }

  search(key) {
    return this.searchNode(this.root, key)
  }

  /**
   *
   * @param {Node} node
   * @param {*} key
   */
  searchNode(node, key) {
    if (node == null) {
      return false
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    }
    return true
  }

  remove(key) {
    this.root = this.removeNode(this.root, key)
  }

  /**
   *
   * @param {Node} node
   * @param {*} key
   */
  removeNode(node, key) {
    if (node == null) {
      return null
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      if (node.left === null) {
        node = node.left
        return node
      } else if (node.right === null) {
        node = node.right
        return node
      }
      node.key = this.minNode(node.right).key
      node.right = this.removeNode(node.right, node.key)
      return node
    }
  }
}

module.exports = BinarySearchTree

// const tree = new BinarySearchTree()
// tree.insert(11)
// tree.insert(7)
// tree.insert(15)
// tree.insert(5)
// tree.insert(3)
// tree.insert(9)
// tree.insert(8)
// tree.insert(10)
// tree.insert(13)
// tree.insert(12)
// tree.insert(14)
// tree.insert(20)
// tree.insert(18)
// tree.insert(25)
// tree.insert(6)
// tree.inOrderTraverse((key) => {
//   console.log(key)
// })
// tree.preOrderTraverse((key) => {
//   console.log(key)
// })
// tree.postOrderTraverse((key) => {
//   console.log(key)
// })
// console.log("search:" + tree.search(1))
// tree.remove(11)
// tree.preOrderTraverse((key) => {
//   console.log(key)
// })
