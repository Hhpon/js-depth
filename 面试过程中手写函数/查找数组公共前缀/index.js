/**
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *  如果不存在公共前缀，返回空字符串 ""。
 *
 *  示例 1：
 *
 *  输入：strs = ["flower","flow","flight"]
 *  输出："fl"
 *
 *  示例 2：
 *
 *  输入：strs = ["dog","racecar","car"]
 *  输出：""
 *  解释：输入不存在公共前缀。
 *
 */

function commonPrefix(strList) {
  const str = strList[0]
  let result = ''

  for (let i = 0; i < str.length; i++) {
    let isCommon = true
    for (let j = 1; j < strList.length; j++) {
      if (strList[j].slice(i, i + 1) == undefined || str.slice(i, i + 1) != strList[j].slice(i, i + 1)) {
        isCommon = false
        break
      }
    }
    if (isCommon) {
      result += str.slice(i, i + 1)
    }
  }

  return result
}

// const strs = ["flower", "flow", "flight"]
const strs = ["dog", "racecar", "car"]

console.log(commonPrefix(strs));