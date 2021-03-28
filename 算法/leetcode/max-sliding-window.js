// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const ans = []
  if (nums.length === 0 || k < 1) {
    return ans
  }
  const queue = []
  for (let i = 0; i < nums.length; i++) {
    if (queue.length < k) {
      queue.push(nums[i])
    } else {
      ans.push(Math.max(...queue))
      queue.push(nums[i])
      queue.shift()
    }
  }
  ans.push(Math.max(...queue))
  return ans
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
