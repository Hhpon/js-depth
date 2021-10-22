/**
 * 
 * promise.all(iterable) iterable 代表 set、map、array
 * 如果可迭代对象为空时，promise直接返回完成的状态
 * 可迭代对象的所有内容都是成功状态时，我们按照传入的顺序对应结果返回成功状态的数组
 * 如果有一个失败了，那我们以这个失败的结果返回回去失败状态
 * 
 * @param {*} promiseList 
 * @returns 
 */

function all(promiseList) {
  return new Promise((resolve, reject) => {
    const result = []
    if (promiseList.length === 0) {
      resolve()
    }
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