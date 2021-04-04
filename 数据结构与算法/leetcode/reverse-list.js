// [剑指 Offer 24. 反转链表](!https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head
  }
  const newHead = reverseList(head.next)
  head.next.next = head
  head.next = null
  return newHead
}

// var reverseList = function (head) {
//     const dummy = null
//     let current = head
//     let previous = dummy
//     while (current != null) {
//         const next = current.next
//         current.next = previous
//         previous = current
//         current = next
//     }
//     return previous
// };
