const stringType = "[object String]"
const dateType = "[object Date]"
const regType = "[object RegExp]"
const symbolType = "[object Symbol]"

const objectType = "[object Object]"
const arrayType = "[object Array]"
const mapType = "[object Map]"
const setType = "[object Set]"

const isDeep = [stringType, dateType, regType, symbolType, objectType, arrayType, mapType, setType]

const isObject = (obj) => {
  return obj !== null && (typeof obj == "object" || typeof obj == "function")
}

const getObjectType = (obj) => {
  return Object.prototype.toString.call(obj)
}

/**
 *
 * @param {any} obj
 * @returns
 */
function deepClone(obj) {
  if (!isObject(obj)) {
    return obj
  }
  const type = getObjectType(obj)
  if (type === stringType || type === dateType) {
    return new obj.constructor(obj)
  }
  if (type === regType) {
    const result = new obj.constructor(obj.source, /\w*$/.exec(obj))
    result.lastIndex = obj.lastIndex
    return result
  }
  if (type === symbolType) {
    return Object(Symbol.prototype.valueOf.call(obj))
  }
  if (type === arrayType || type === objectType) {
    const result = type === arrayType ? [] : {}
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        result[key] = deepClone(obj[key])
      }
    }
    return result
  }
  if (type === mapType) {
    const result = new Map()
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        result.set(key, deepClone(obj.get(key)))
      }
    }
    return result
  }
  if (type === setType) {
    const result = new Set()
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        result.add(deepClone(obj.get(key)))
      }
    }
    return result
  }
}

/**
 * 对象的深拷贝难点主要是如何复制引用类型
 * 按照引用类型的复制方式，我们可以
 */

const map = new Map()
map.set("num1", 1)
map.set("num2", 2)
const set = new Set()
set.add(1)
set.add(2)

const obj = {
  string: new String("string"),
  date: new Date(),
  reg: /\w*$/,
  symbol: Object(Symbol(1)),
  obj: {
    test: "test Obj clone!",
  },
  array: [1, 2, 3, 4, 5],
  map,
  set,
}

const result = deepClone(obj)

console.log(result)
console.log(obj)

console.log(result === obj)

let num = 0
for (const key in obj) {
  if (Object.hasOwnProperty.call(obj, key)) {
    const element = obj[key]
    if (result[key] === element) {
      console.log(`the key of ${key} is not deepClone!`)
      break
    }
  }
  num++
  if (num === Object.keys(result).length) {
    console.log("deepClone success!")
  }
}
