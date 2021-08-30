function insertSort(arr) {
  if (arr.length === 0) return
  const newArr = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    let isInsert = false
    for (let j = 0; j < newArr.length; j++) {
      if (arr[i] < newArr[j]) {
        for (let m = newArr.length; m > j; m--) {
          newArr[m] = newArr[m - 1]
        }
        isInsert = true
        newArr[j] = arr[i]
        break
      }
    }
    if (!isInsert) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

console.log(insertSort([4, 5, 6, 1, 2, 3]))