const arrayType = "[object Array]"
const objectType = "[object Object]"
const setType = "[object Set]"
const mapType = "[object Map]"

const deepType = [arrayType, objectType, setType, mapType]

const stringType = "[object String]"
const numberType = "[object Number]"
const booleanType = "[object Boolean]"
const errorType = "[object Error]"
const symbolType = "[object Symbol]"
const dateType = "[object Date]"
const regType = "[object Reg]"

function isObject(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

function getObjType(obj) {
  return Object.prototype.toString.call(obj)
}

/**
 *
 * @param {RegExp} obj
 */
function regClone(obj) {
  const reg = new obj.constructor(obj.source, /\w*$/.exec(obj))
  reg.lastIndex = obj.lastIndex
  return reg
}

function symbolClone(obj) {
  return Object(Symbol.prototype.valueOf.call(obj))
}

function otherClone(obj, type) {
  switch (type) {
    case stringType:
    case numberType:
    case booleanType:
    case errorType:
    case dateType:
      return new obj.constructor(obj)
    case regType:
      return regClone(obj)
    case symbolType:
      return symbolClone(obj)
  }
}

function deepClone(obj, map = new Map()) {
  if (!isObject(obj)) {
    return obj
  }

  if (map.get(obj)) {
    return map.get(obj)
  }

  let result
  const objType = getObjType(obj)
  if (deepType.includes(objType)) {
    result = new obj.constructor()
  } else {
    result = otherClone(obj, objType)
  }

  if (objType === setType) {
    obj.forEach((value) => {
      result.add(deepClone(value, map))
    })
  }

  if (objType === mapType) {
    obj.forEach((key, value) => {
      result.set(key, deepClone(value, map))
    })
  }

  if (objType === arrayType || objType === objectType) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key]
        result[key] = element
      }
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
