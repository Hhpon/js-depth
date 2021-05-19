const BinarySearchTree = require("./binary-search-tree")
const { defaultCompare, Compare, BalanceFactor } = require("../util")
const { Node } = require("../models/node")

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.root = null
  }

  getNodeHeight(node) {
    if (node === null) {
      return -1
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }

  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  /**
   * 向右单旋
   * @param {Node} node
   */
  rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }

  /**
   * 向左单旋
   * @param {Node} node
   */
  rotationRR(node) {
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }

  rotationLR(node) {
    node.left = this.rotationLL(node.left)
    return this.rotationRR(node)
  }

  rotationRL(node) {
    node.right = this.rotationRR(node.right)
    return this.rotationLL(node)
  }

  insert(key) {
    this.root = this.insertNode(this.root, key)
  }

  insertNode(node, key) {
    if (node === null) {
      return new Node(key)
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.insertNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.insertNode(node.right, key)
    }
    const balanceFactor = this.getBalanceFactor(node)
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node)
      } else {
        return this.rotationLR(node)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.left.key)) {
        node = this.rotationRR(node)
      } else {
        return this.rotationRL(node)
      }
    }
    return node
  }

  removeNode(node, key) {
    node = super.removeNode(node, key)
    if (node === null) {
      return node
    }
    const balanceFactor = this.getBalanceFactor(node)
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        this.rotationLL(node)
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        this.rotationLR(node)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right)
      if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        this.rotationRR(node)
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        this.rotationRL(node)
      }
    }
    return node
  }
}
