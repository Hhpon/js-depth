const stringType = '[object String]'
const numberType = '[object Number]'
const booleanType = '[object Boolean]'
const dateType = '[object Date]'
const errorType = '[object Error]'

const symbolType = '[object Symbol]'
const regType = '[object RegExp]'

const arrayType = '[object Array]'
const objectType = '[object Object]'
const setType = '[object Set]'
const mapType = '[object Map]'

const deepTypes = [arrayType, objectType, setType, mapType]

const otherClone = (obj) => {
  switch (key) {
    case stringType:
    case numberType:
    case booleanType:
    case dateType:
    case errorType:
      return new obj.constructor(obj);
    case symbolType:
      return Object(Symbol.prototype.valueOf.call(obj))
    case regType:
      const result = new obj.constructor(obj.source, /\w*$/.exec(obj)[0])
      result.lastIndex = obj.lastIndex
      return result
  }
}

const isObject = (obj) => {
  return obj != null && (typeof obj == 'object' || typeof obj == 'function')
}

const getObjectType = (obj) => {
  return Object.prototype.toString.call(obj)
}

const deepClone = (obj) => {
  if (!isObject(obj)) {
    return obj
  }
  const type = getObjectType(obj)
  if (deepTypes.includes(type)) {
    const result = new obj.constructor()
  } else {
    return otherClone(obj)
  }
  if (type === arrayType || type === objectType) {
    for (let key in obj) {
      result[key] = deepClone(obj[key])
    }
    return result
  }
  if (type === setType) {
    for (let value of obj) {
      result.add(deepClone(value))
    }
    return result
  }
  if (type === mapType) {
    for (let [key, value] of obj) {
      result.set(key, deepClone(value))
    }
    return result
  }
}