
const result = []
function cal8queens(row) {
  if (row === 8) {
    console.log(result)
    return result
  }
  for (let col = 0; col < 8; col++) {
    if (isOk(col, row)) {
      result[row] = col
      cal8queens(row + 1)
    }
  }
}

function isOk(col, row) {
  let leftUp = col - 1, rightUp = col + 1;
  for (let i = row - 1; i >= 0; i--) {
    if (result[i] === col) return false
    if (leftUp >= 0 && result[i] === leftUp) return false
    if (rightUp < 8 && result[i] === rightUp) return false
    leftUp--
    rightUp++
  }
  return true
}

cal8queens(0)