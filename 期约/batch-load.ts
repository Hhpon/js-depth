function load(url) {
  return new Promise(() => {})
}

function batchLoad(urls: string[], concurrent: number) {
  return new Promise(async (resolve, reject) => {
    const { length } = urls
    const count = Math.ceil(length / concurrent)
    const temResults = []
    for (let i = 0; i < count; i++) {
      const currentUrls = urls.slice(i * concurrent, concurrent * (i + 1))
      temResults[i] = await all(currentUrls)
      if (temResults.length === count) {
        const result = []
        temResults.forEach((temResult) => {
          result.concat(temResult)
        })
        resolve(result)
      }
    }
  })
}

function all(currentUrls) {
  return new Promise((resolve, reject) => {
    const result = []
    for (let j = 0; j < currentUrls.length; j++) {
      const currentUrl = currentUrls[j]
      load(currentUrl)
        .then((res) => {
          result[j] = res
          if (result.length === currentUrls.length) {
            resolve(result)
          }
        })
        .catch((err) => {
          result[j] = err
          if (result.length === currentUrls.length) {
            resolve(result)
          }
        })
    }
  })
}
