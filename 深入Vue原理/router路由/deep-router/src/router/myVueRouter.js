class HistoryRoute {
  constructor() {
    this.current = null
  }
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash"
    this.routes = options.routes || []
    // 哈希结构 - 查找更迅速
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRoute()
    this.init()
  }

  init() {
    if (this.mode === "hash") {
      location.hash ? "" : (location.hash = "/")
      window.addEventListener("load", () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      location.pathname ? "" : (location.pathname = "/")
      window.addEventListener("load", () => {
        this.history.current = location.pathname
        console.log(location.pathname)
      })
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname
        console.log(location.pathname)
      })
    }
  }

  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component
      return pre
    }, {})
  }

  static install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this._root = this
          this._router = this.$options.router
          Vue.util.defineReactive(this, "_route", this._router.history)
        } else {
          this._root = this.$parent._root
        }
        Object.defineProperty(this, "$router", {
          get() {
            return this._root._router
          },
        })
        Object.defineProperty(this, "$route", {
          get() {
            return this._root._router.history.current
          },
        })
      },
    })

    Vue.component("router-link", {
      props: {
        to: String,
      },
      render(h) {
        let mode = this._self._root._router.mode
        let to = mode === "hash" ? "#" + this.to : this.to
        return h("a", { attrs: { href: to } }, this.$slots.default)
      },
    })

    Vue.component("router-view", {
      render(h) {
        let current = this._self._root._router.history.current
        let routeMap = this._self._root._router.routesMap
        console.log(current)
        return h(routeMap[current])
      },
    })
  }
}

export default VueRouter
