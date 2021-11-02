
/**
 * 
 * @param {Promise[]} promiseList
 * @return {Promise<any[]>}  
 */
function all(promiseList) {
  return new Promise(async (resolve, reject) => {
    const result = []
    for (let i = 0; i < promiseList.length; i++) {
      try {
        const res = await promiseList[i]
        result.push(res)
      } catch (error) {
        reject(error)
        break;
      }
    }
    resolve(result)
  })
}

const promiseTimeout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 1000);
  })
}

const promiseList = [Promise.resolve(1), promiseTimeout(), Promise.resolve(3)]
all(promiseList).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})