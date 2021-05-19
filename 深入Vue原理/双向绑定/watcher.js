class Watcher {
  constructor(vm, expOrFn, cb) {
    this.depIds = {}
    this.vm = vm
    this.cb = cb
    this.expOrFn = expOrFn
    this.val = this.get()
  }

  update() {
    this.run()
  }
  addDep() {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }
  run() {
    const val = this.get()
    console.log(val)
    if (val !== this.val) {
      this.val = val
      this.cb.call(this.vm, val)
    }
  }
  get() {
    Dep.target = this
    const val = this.vm._data[this.expOrFn]

    Dep.target = null
    return val
  }
}
