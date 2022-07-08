const stringType = '[object String]'
const numberType = '[object Number]'
const booleanType = '[object Boolean]'
const dateType = '[object Date]'
const symbolType = '[object Symbol]'
const regType = '[object RegExp]'

const setType = '[object Set]'
const mapType = '[object Map]'
const objType = '[object Object]'
const arrType = '[object Array]'

const deepTypes = [setType, mapType, objType, arrType]

function isObject(obj) {
  return (typeof obj == 'object' || typeof obj == 'function') && obj != null
}

function getObjType(obj) {
  return Object.prototype.toString.call(obj)
}

function deepClone(obj) {
  if (!isObject(obj)) return obj

  const objType = getObjType(obj)
  let result
  if (objType == stringType || objType == numberType || objType == booleanType || objType == dateType) {
    result = new obj.constructor(obj)
    return result
  } else if (objType == symbolType) {
     
  } else if (objType == regType) {
    result = new obj.constructor(obj.source, )
    return result
  }

  if (objType == setType) {
    result = new Set()
    for (let item of obj) {
      result.add(isObject(item) ? deepClone(item) : item)
    }
    return result
  }

  if (objType == mapType) {
    result = new Map()
    for (let key of obj) {
      if (isObject(obj.get(key))) {
        result.set(key, deepClone(obj.get(key)))
      } else {
        result.set(key, obj.get(key))
      }
    }
    return result
  }

  if (objType == arrayType) {
    result = []
    for (let item of obj) {
      result.push(isObject(item) ? deepClone(item) : item)
    }
    return result
  } 

  if (objType == objType) {
    result = {}
    for (let key in obj) {
      if (!isObject(obj[key])) {
        result[key] = obj[key]
      } else {
        result[key] = deepClone(obj[key])
      }
    }
    return result
  }
}