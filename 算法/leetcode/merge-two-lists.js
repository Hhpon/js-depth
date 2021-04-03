function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

var mergeTwoLists = function (l1, l2) {
  const prehead = new ListNode(-1)

  let prev = prehead
  while (l1 !== null && l2 !== null) {
    if (l1.val > l2.val) {
      prev.next = l2
      l2 = l2.next
    } else {
      prev.next = l1
      l1 = l1.next
    }
    prev = prev.next
  }
  prev.next = l1 === null ? l2 : l1
  return prehead.next
}
