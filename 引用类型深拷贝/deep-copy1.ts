/**
 * 解决循环引用问题
 */

function deepCopy(obj) {
  if (typeof obj === "object") {
    const result = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      result[key] = deepCopy(obj[key])
    }
    return result
  } else {
    return obj
  }
}

let a: any = {
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
