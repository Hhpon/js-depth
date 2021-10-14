// 给定一个三角形 triangle ，找出自顶向下的最小路径和。
// 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
// 回溯算法

var minimumTotal = function (triangle) {
  let minDist
  function f(i, j, dist) {
      if (i === triangle.length - 1) {
          if (minDist == undefined && dist < minDist) {
              minDist = dist
          }
      }
      f(i + 1, j, dist + triangle[i + 1, j])
      f(i + 1, j + 1, dist + triangle[i + 1, j + 1])
  }
  f(0, 0, 2)
  return minDist
};