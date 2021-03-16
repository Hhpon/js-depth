const obj = {
  name: "app",
  age: 18,
  a: {
    b: 1,
    c: 2,
  },
}

const app = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log("访问属性:" + propKey)
    return Reflect.get(...arguments)
  },
  set(target, propKey, value, receiver) {
    console.log("设置属性:" + propKey)
    Reflect.set(...arguments)
  },
})

console.log(app.name)
app.age = 20

app.newPropKey = "新属性"
console.log(app.newPropKey)
