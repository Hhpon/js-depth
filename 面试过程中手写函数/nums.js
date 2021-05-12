const nums = [1, 2, 3, 2, 2, 1]
const k = 2

function getCountMax(nums, k) {
  const numMap = new Map()
  let ele

  for (let i = 0; i < nums.length; i++) {
    ele = nums[i]
    if (numMap.get(ele)) {
      numMap.set(ele, numMap.get(ele) + 1)
    } else {
      numMap.set(ele, 1)
    }
  }

  const numLists = Array.from(numMap)

  numLists.sort((prev, cur) => {
    return cur[1] - prev[1]
  })
  
  return numLists.map((num) => num[0]).slice(0, k)
}

console.log(getCountMax(nums, k))
