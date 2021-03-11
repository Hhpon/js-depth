/**
 * 解决循环引用问题
 */

function deepCopy(obj, map = new Map()) {
  if (typeof obj === "object") {
    let result = Array.isArray(obj) ? [] : {}
    if (map.get(obj)) {
      return map.get(obj)
    }
    map.set(obj, result)
    for (const key in obj) {
      result[key] = deepCopy(obj[key], map)
    }
    return result
  } else {
    return obj
  }
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

a.a = a

// let b = a
// let b = Object.assign({}, a)
let b = deepCopy(a)

a.name = "张学友"
a.song[2] = "吻别"

console.log(a)
console.log(b)
