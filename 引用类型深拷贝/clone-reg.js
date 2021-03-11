// const regexp = /xyz/gimsuy
const regexp = new RegExp("xyz", "gimsuy")

console.log(regexp.flags)

console.log(regexp.toString())

console.log(/\w*$/.exec(regexp.toString()).toString())
