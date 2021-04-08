/**
 * 
 * 链表排序
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 进阶：
 *     你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 * 下方代码采用的是归并排序的算法。在查找链表中点的时候使用的是遍历整个链表算出链表长度除以二的方式；除此之外还可以使用快慢指针的方式。
 * 
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
* 
* @param {Number} a
* @param {Number} b
* @return {boolean}
*/
function defaultCompare(a, b) {
  return a > b
}

/**
* @param {ListNode} head
* @return {ListNode}
*/
var sortList = function (head) {
  if (head == null) {
      return head
  }
  const result = mergeSort(head)
  return result
};

/**
* 分割链表
* @param {ListNode} head
* @param {function} compareFn
* @return {ListNode}
*/
function mergeSort(head, compareFn = defaultCompare) {
  if (head.next != null) {
      const length = getListNodeLength(head)
      const mid = Math.floor(length / 2)
      const prev = getElementIndexAt(mid - 1, head)
      const current = prev.next
      prev.next = null
      const left = mergeSort(head)
      const right = mergeSort(current)
      head = merge(left, right, compareFn)
  }
  return head
}

/**
* 排序当前最小单元链表
* @param {ListNode} left
* @param {ListNode} right
* @return {ListNode}
*/
function merge(left, right, compareFn) {
  let head = new ListNode()
  let current = head
  while (left != null && right != null) {
      if (compareFn(left.val, right.val)) {
          current.next = new ListNode(right.val)
          right = right.next
      } else {
          current.next = new ListNode(left.val)
          left = left.next
      }
      current = current.next
  }
  current.next = left != null ? left : right
  return head.next
}

/**
* 
* @param {ListNode} head
* @return {Number}
*/
function getListNodeLength(head) {
  let length = 0
  while (head != null) {
      length++
      head = head.next
  }
  return length
}

/**
* 
* @param {ListNode} head
* @param {ListNode} listNode
* @return {number}

var getOrderIndex = (head, listNode) => {
  let index = 0
  let current = head
  while (current !== null) {
      if (listNode.val < current.val) {
          return index
      }
      index++
      current = current.next
  }
  return index
}
*/

/**
* 
* @param {ListNode} listNode
* @param {number} index

var insertAt = (listNode, index, newList) => {
  if (newList === null) {
      return newList = listNode
  }
  if (index === 0) {
      listNode.next = newList
      return listNode
  }
  const prev = getElementIndexAt(index - 1, newList)
  const current = prev.next
  prev.next = listNode
  listNode.next = current
  return newList
}
*/

/**
* 
* @param {number} index
* @param {ListNode} head
* @return {ListNode}
*/
var getElementIndexAt = (index, head) => {
  let current = head
  for (let i = 0; i < index; i++) {
      current = current.next
  }
  return current
}