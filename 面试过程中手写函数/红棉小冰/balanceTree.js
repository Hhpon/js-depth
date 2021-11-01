class Tree {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

const root = new Tree(1)
const left = new Tree(2)
const right = new Tree(3)

root.left = left
left.left = right

function balanceTree(tree) {
  let result = true
  postOrder(tree, (node) => {
    if (Math.abs(getHeight(node.left) - getHeight(node.right)) > 1) {
      result = false
    }
  })
  return result
}

function postOrder(node, callback) {
  if (node == null) return
  postOrder(node.left, callback)
  postOrder(node.right, callback)
  callback(node)
}

function getHeight(node) {
  if (node == null) return 0
  return 1 + Math.max(getHeight(node.left), getHeight(node.right))
}

const isBalance = balanceTree(root)
console.log(isBalance)