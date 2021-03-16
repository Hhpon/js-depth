const p = new Promise((resolve, reject) => {
  resolve("123")
})

p.then((res) => {
  console.log(res)
  return "gogogo"
}).finally((res) => {
  console.log(res)
})
