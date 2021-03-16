class Observer {
  constructor(data) {
    for (const key in data) {
      if (typeof data[key] === "object") {
        this[key] = new Observer(data[key])
      }
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log("访问了属性:" + key)
          return data[key]
        },
        set(value) {
          console.log("设置了属性:" + key)
          if (data[key] === value) return
          data[key] = value
          console.log("设置相关属性值")
        },
      })
    }
  }
}

// 我们是通过对象的get/set方法实现的双向绑定机制，由于我们是在新建对象的时候设置的属性的get/set方法，所以给对象新增的属性无法实现双向绑定
// 但是在es6新增属性代理这块就不会有这个问题，因为代理让对象的属性们天生就有get/set方法(甚至更多)

const obj = {
  name: "app",
  age: 18,
  a: {
    b: 1,
    c: 2,
  },
}

const app = new Observer(obj)

console.log(app)

console.log(app.name)
app.age = 20

app.newPropKey = "新属性"
console.log(app.newPropKey)
