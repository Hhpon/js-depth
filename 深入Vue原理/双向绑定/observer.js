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

function observe(value) {
  if (!value || typeof value !== "object") {
    return
  }
  return new Observer(value)
}

function defineReactive(obj, key) {
  const dep = new Dep()
  let childObj = observe(obj[key])
  Object.defineProperty({
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
      childObj = observe(newVal)
      dep.notify()
    },
  })
}
