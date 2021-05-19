/**
 * 为了更好的理解博客
 * (https://juejin.cn/post/6844903601416978439#heading-10)
 * 中所讲的Vue2.0双向绑定原理，所以自己再重新实现一下这个方法(ts)
 */
let uid = 0

class Dep {
  id = uid++
  subs: Subscriber[] = []
  static target: Subscriber | null = null

  addSub(sub: Subscriber): void {
    this.subs.push(sub)
  }

  notify(): void {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
}

class Subscriber {
  depIds: { [propName: string]: Dep } = {}
  vm: Vue
  cb: any
  expOrFn: any
  val: any

  constructor(vm: Vue, expOrFn: any, cb: any) {
    this.vm = vm
    this.expOrFn = expOrFn
    this.cb = cb
    this.val = this.get()
  }

  update() {
    this.run()
  }

  run() {
    const val = this.get()
    if (this.val !== val) {
      this.val = val
      this.cb.call(this.vm, val)
    }
  }

  get() {
    Dep.target = this
    console.log(this.vm)
    const val = this.vm.data[this.expOrFn]

    Dep.target = null
    return val
  }

  addDep(dep: Dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }
}

class Observer {
  value: any
  constructor(value: any) {
    this.value = value
    this.walk()
  }
  walk() {
    Object.keys(this.value).forEach((key) => this.defineReactive(this.value, key, this.value[key]))
  }
  defineReactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      set(newValue) {
        console.log(val)
        if (val === newValue) return
        val = newValue
        observe(newValue)
        dep.notify()
      },
      get() {
        console.log(val)
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
    })
  }
}

const observe = (value) => {
  if (!value || typeof value !== "object") return
  return new Observer(value)
}

class Vue {
  data: any
  constructor(option: { data: any }) {
    // Vue 初始化过程中会把传入的data数据设置响应式功能
    this.data = option.data
    Object.keys(this.data).forEach((key) => this.proxy(key))
    observe(this.data)
  }
  $watch(expOrFn: any, callback: any) {
    new Subscriber(this, expOrFn, callback)
  }
  proxy(key: string) {
    Object.defineProperty(this, key, {
      get() {
        return this.data[key]
      },
      set(newValue: any) {
        this.data[key] = newValue
      },
    })
  }
}

const demo: any = new Vue({
  data: { text: "" },
})

const input = document.getElementById("input")
const p = document.getElementById("p")

input.addEventListener("input", (event: any) => {
  demo.text = event.target.value
})

demo.$watch("text", (val: string) => (p.innerHTML = val))
