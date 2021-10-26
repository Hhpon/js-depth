/**
 *
 * Promise.all(iterable)
 * 确认iterable的格式
 * iterable是一个可迭代对象，每一项的内容可能是promise，也可能不是
 * 该方法会返回一个promise
 * 成功状态下 数组的每一项对应于iterable的每项结果
 * 如果有一个promise的结果是失败，那么整个promise的返回内容也是失败，且失败内容是这个失败的结果
 *
 */

function all(iterable) {
  // 是否需要测试一下iterable的类型
  if (!Array.isArray(iterable)) {
    throw new Error('iterable must be Array!')
  }
  return new Promise((resolve, reject) => {
    const result = []
    for (let i = 0; i < iterable.length; i++) {
      if (iterable[i] instanceof Promise) {
        iterable[i].then((res) => {
          result[i] = res
          if (result.length === iterable.length) {
            resolve(result)
          }
        }).catch((err) => {
          reject(err)
        });
      } else {
        result[i] = iterable[i]
        if (result.length === iterable.length) {
          resolve(result)
        }
      }
    }
  })
}