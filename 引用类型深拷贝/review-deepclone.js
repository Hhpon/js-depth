const regType = "[object RegExp]"
const dateType = "[object Date]"
const symbolType = "[object Symbol]"

const setType = "[object Set]"
const mapType = "[object Map]"
const objectType = "[object Object]"
const arrayType = "[object Array]"

const deepType = [setType, mapType, objectType, arrayType]

function isObject(target) {
  return target !== null && (typeof target === "object" || typeof target === "function")
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

function otherClone(target, type) {
  switch (type) {
    case dateType:
      return new target.constructor(target)
    case regType:
      console.log(/\w*$/.exec(target))
      const regResult = new target.constructor(target.source, /\w*$/.exec(target)[0])
      regResult.lastIndex = target.lastIndex
      return regResult
    case symbolType:
      return Object(Symbol.prototype.valueOf.call(target))
    default:
      return null
  }
}

function getInit(target) {
  return new target.constructor()
}

function deepClone(target) {
  if (!isObject(target)) return target

  let result = null
  const type = getType(target)

  if (deepType.includes(type)) {
    result = getInit(target)
  } else {
    return otherClone(target, type)
  }

  if (type === setType) {
    target.forEach((value) => {
      result.add(deepClone(value))
    })
    return result
  }

  if (type === mapType) {
    target.forEach((key, value) => {
      result.set(key, deepClone(value))
    })
    return result
  }

  if (type === arrayType || type === objectType) {
    for (const key in target) {
      result[key] = deepClone(target[key])
    }
    return result
  }
}

let a = {
  name: "andy",
  age: 15,
  song: ["冰雨", "忘情水", "今天"],
  sun: {
    name: "tom",
    birthday: new Date(),
    music: new RegExp("abc", "gi"),
  },
  goods: new Set(["123", "456"]),
  symbol: Object(Symbol("symbol")),
  und: undefined,
}

let b = deepClone(a)

a.goods.add("789")

console.log(a)
console.log(b)
