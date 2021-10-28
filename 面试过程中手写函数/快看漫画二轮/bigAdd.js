/**
 * 
 * @param {string} num1 
 * @param {string} num2 
 * @returns {string}
 */
function bigAdd(num1, num2) {
  const result = []
  const num1Arr = num1.split('')
  const num2Arr = num2.split('')
  let temNum = 0
  while (num1Arr.length > 0 || num2Arr.length > 0) {
    const p = num1Arr.pop() || 0
    const q = num2Arr.pop() || 0
    const temSum = p + q + temNum
    temNum = 0
    if (temSum < 10) {
      result.unshift(temSum)
    } else {
      result.unshift(temSum % 10)
      temNum = Math.floor(temSum / 10)
    }
  }
  return result.join('')
}