/**
 * Promise[]
 */
function all(promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new Error('promiseList must be array!')
  }
  return new Primise((resolve, reject) => {
    const result = []
    for (let i = 0; i < promiseList.length; i++) {
      if (promiseList[i] instanceof Promise) {
        promiseList[i].then((res) => {
          result[i] = res
          if (result.length === promiseList.length) {
            resolve(result)
          }
        }).catch((err) => {
          reject(err)
        });
      } else {
        result[i] = promiseList[i]
        if (result.length === promiseList.length) {
          resolve(result)
        }
      }
    }
  })
}