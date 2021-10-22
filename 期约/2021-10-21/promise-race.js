/**
 * promise.race(iterable)
 * 迭代对象中的一个解决或拒绝，返回的promise就解决或拒绝
 */

function race(iterable) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < iterable.length; i++) {
      iterable[i].then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      });
    }
  })
}