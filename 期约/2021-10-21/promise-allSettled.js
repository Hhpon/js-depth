/**
 *
 * Promise.allSettled(iterable)
 * 无论成功失败，都把结果存放到数组当中
 */

function allSettled(iterable) {
  return new Promise((resolve, reject) => {
    const result = []
    for (let i = 0; i < iterable.length; i++) {
      iterable[i].then((res) => {
        result[i] = res
      }).catch((err) => {
        result[i] = err
      }).finally(() => {
        if (result.length === iterable.length) {
          resolve(result)
        }
      })
    }
  })
}
