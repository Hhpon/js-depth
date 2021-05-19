// num 安全数字  2**53-1  2**-53-1
// 大整数高精度计算

type numType = string

function checkNum(num: numType) {
  return typeof num === "string" && !isNaN(Number(num))
}

function formatNum(num: numType | undefined) {
  return isNaN(Number(num)) ? 0 : Number(num)
}

function bigNumAdd(num1: numType, num2: numType) {
  if (!(checkNum(num1) && checkNum(num2))) {
    throw "big num error"
  }

  const tem1 = num1.split("").reverse(),
    tem2 = num2.split("").reverse(),
    result = []
  let carry = 0

  for (let i = 0; i <= Math.max(tem1.length, tem2.length); i++) {
    const curSum = formatNum(tem1[i]) + formatNum(tem2[i]) + carry
    carry = Math.floor(curSum / 10)
    result.push(curSum >= 10 ? curSum % 10 : curSum)
  }

  result.reverse()
  return result[0] === 0 ? result.join("").slice(1) : result.join("")
}

console.log(bigNumAdd("1111111111111111111111111111111111111111111111111111111111111111.1", "99"))

console.log(2 ** 53 + 1)

console.log(bigNumAdd("9007199254740992", "4"))
