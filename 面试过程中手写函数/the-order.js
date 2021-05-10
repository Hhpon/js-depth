/**
 *
 * @param {string} str
 */
 const theOrder = (str) => {
  const strArr = str.split(" ")
  strArr.sort((prev, cur) => {
    return findNum(cur) - findNum(prev)
  })
  return strArr
}

const findNum = (str) => {
  const reg = /[0-9]/
  return reg.exec(str)[0]
}

theOrder('a3 a1 a2')