/**
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 *
 * 示例 1：
 *
 * 输入：nums = [1,2,0]
 * 输出：3
 *
 * 示例 2：
 *
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 *
 * 示例 3：
 *
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 *
 */

/**
 * 时间复杂度是O(n^2)
 * 空间复杂度是O(1)
 */
// function findSmaller(nums) {
//   for (let i = 1; i <= nums.length; i++) {
//     let isSmaller = true
//     for (let j = 0; j < nums.length; j++) {
//       if (nums[j] == i) {
//         isSmaller = false
//       }
//     }
//     if (isSmaller) return i
//   }
// }

function findSmaller(nums) {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] >= 1 && nums[i] <= nums.length && nums[nums[i] - 1] != nums[i]) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]]
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }
  return nums.length + 1
}

const nums = [1, 2, 0]

console.log(findSmaller(nums));
