/**
 * 考虑其他数据类型
 */
const mapTag = "[object Map]"
const setTag = "[object Set]"
const arrayTag = "[object Array]"
const objectTag = "[object Object]"

const boolTag = "[object Boolean]"
const dateTag = "[object Date]"
const errorTag = "[object Error]"
const numberTag = "[object Number]"
const regexpTag = "[object RegExp]"
const stringTag = "[object String]"
const symbolTag = "[object Symbol]"

const deepTag = [mapTag, setTag, arrayTag, objectTag]

/**
 *
 * @param obj
 * @returns constructor
 * 获取对象的构造函数,并初始化一个最简单的引用值
 */
function getInit(obj) {
  const Ctor = obj.constructor
  return new Ctor()
}

/**
 *
 * @param obj
 * @returns Boolean
 */
function isObject(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

/**
 *
 * @param {any} obj
 * @returns string
 */
function getType(obj) {
  return Object.prototype.toString.call(obj)
}

function cloneOtherType(obj, type) {
  switch (type) {
    case boolTag:
    case dateTag:
    case numberTag:
    case stringTag:
    case errorTag:
      return new obj.constructor(obj)
    case regexpTag:
      return copyReg(obj)
    case symbolTag:
      return copySymbol(obj)
    default:
      return null
  }
}

function copySymbol(obj) {
  return Object(Symbol.prototype.valueOf.call(obj))
}

function copyReg(obj) {
  const result = new obj.constructor(obj.source, /\w*$/.exec(obj))
  result.lastIndex = obj.lastIndex
  return result
}

/**
 *
 * @param {any} obj
 * @param {Map} map
 * @returns
 */
function deepCopy(obj, map = new Map()) {
  // 克隆原始值
  if (!isObject(obj)) {
    return obj
  }

  const typeTag = getType(obj)
  let result = null

  if (deepTag.includes(typeTag)) {
    result = getInit(obj)
  } else {
    return cloneOtherType(obj, typeTag)
  }

  // 防止循环引用的情况消耗光栈内存
  // 对已经拷贝过的value做个标记
  if (map.get(obj)) {
    return map.get(obj)
  }
  map.set(obj, result)

  if (typeTag === setTag) {
    obj.forEach((value) => {
      result.add(deepCopy(value, map))
    })
    return result
  }

  if (typeTag === mapTag) {
    obj.forEach((key, value) => {
      result.set(key, deepCopy(value, map))
    })
    return result
  }

  if (typeTag === arrayTag || typeTag === objectTag) {
    for (const key in obj) {
      result[key] = deepCopy(obj[key], map)
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
    music: new RegExp("abc"),
  },
  goods: new Set(),
  symbol: Object(Symbol("symbol")),
}

a.a = a

// let b = a
// let b = Object.assign({}, a)
let b = deepCopy(a)

a.name = "张学友"
a.song[2] = "吻别"

console.log(a)
console.log(b)
