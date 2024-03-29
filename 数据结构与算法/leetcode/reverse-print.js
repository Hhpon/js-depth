// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
// https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/
// 输入：head = [1,3,2]
// 输出：[2,3,1]

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */

var reversePrint = function (head) {
  const arr = []
  let current = head
  while (current != null) {
    arr.push(current.val)
    current = current.next
  }
  arr.reverse()
  return arr
}
