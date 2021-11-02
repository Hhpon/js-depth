/**
 *
 * arr.reduce((a, b)=>{return value}, initValue)
 * 
 * 1. a: initValue || arr[0]
 * 2. b: initValue ? arr[0] : arr[1] 
 * 
 * a: value
 */

const arr = []
function reduce(callback, initValue) {
  let a, b
  let index = 0
  if (initValue) {
    a = initValue
    b = arr[index]
  } else {
    a = arr[index]
    b = arr[index + 1]
  }
}