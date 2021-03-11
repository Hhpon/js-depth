/**
 * 仅仅考虑了object、array两种情况
 * set、map可迭代的情况没有考虑
 * 循环引用的情况没有考虑
 * **/
function deepCopy(obj) {
  const result = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = deepCopy(obj[key])
    } else {
      result[key] = obj[key]
    }
  }
  return result
}

let a = {
  name: "andy",
  age: 15,
  song: ["冰雨", "忘情水", "今天"],
  sun: {
    name: "tom",
    birthday: Date(),
    music: new RegExp("abc"),
  },
}

// let b = a
// let b = Object.assign({}, a)
let b = deepCopy(a)

a.name = "张学友"
a.song[2] = "吻别"

console.log(a)
console.log(b)
