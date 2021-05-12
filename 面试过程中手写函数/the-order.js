/**
 *
 * @param {string} str
 */
const theOrder = (str) => {
  const strArr = str.split(" ")
  strArr.sort((prev, cur) => {
    return findNum(prev) - findNum(cur)
  })
  return strArr
}

const findNum = (str) => {
  const reg = /[0-9]/
  console.log(reg.exec(str)[0])
  return reg.exec(str)[0]
}

console.log(theOrder("a3 a1 a2"))
