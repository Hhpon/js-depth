class Vue {
  constructor(options = {}) {
    this.$options = options
    let data = (this._data = this.$options.data)
    Object.keys(data).forEach((key) => this._proxy(key))
    observe(data)
  }
  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
  }
  _proxy(key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get() {
        this._data[key]
      },
      set(val) {
        this._data[key] = val
      },
    })
  }
}