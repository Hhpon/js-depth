/**
 *
 */

class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

/**
 * 如果传入的数据类型是对象，那么会为这个对象的每个属性增加get、set方法
 * @param {*} value
 * @returns
 */
function observe(value) {
  if (!value || typeof value !== "object") {
    return
  }
  return new Observer(value)
}

/**
 * 为传入的obj的对应key属性增加get、set方法
 * 如果该数据的数据类型是对象，那么会调用observe方法深度遍历data对象
 * @param {*} obj
 * @param {*} key
 */
function defineReactive(obj, key) {
  const dep = new Dep()
  let childObj = observe(obj[key])
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend()
      }
      return obj[key]
    },
    set(newVal) {
      if (obj[key] === newVal) {
        return
      }
      obj[key] = newVal
      // 如果传入的newVal类型是object，那么也需要为这个数据增加set、get方法
      childObj = observe(newVal)
      dep.notify()
    },
  })
}
