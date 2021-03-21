const data = {
  lists: [1],
}

function testDefineProperty(val) {
  Object.defineProperty(data, "lists", {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newVal) {
      console.log("设置data.lists的值")
      if (val === newVal) return
      val = newVal
    },
  })
}

testDefineProperty(data.lists)

data.lists = [123]

console.log(data.lists)

const data1 = {
  lists: [1],
}

const newData1 = new Proxy(data1.lists, {
  get(target, key, receiver) {
    console.log("object")
    return Reflect.get(...arguments)
  },
  set(target, key, value, receiver) {
    console.log("设置数组的值")
    return Reflect.set(...arguments)
  },
})

newData1.push(13)

console.log(newData1.lists)

const data2 = {
  title: "userInfo",
  andy: {
    name: "啦啦啦",
  },
}

const newData2 = new Proxy(data2, {
  set() {
    console.log("设置data2的值")
    return Reflect.set(...arguments)
  },
})

newData2.title = "infoMation" // 设置data的值
newData2.andy.name = "吼吼吼" //  未打印
newData2.andy = { name: "吼吼吼" } // 设置data的值

// newData2.andy = { name: "吼吼吼" }

// console.log(newData2)

const data3 = [123, 123]

const newData3 = new Proxy(data3, {
  set() {
    console.log("设置data3的值")
    return Reflect.set(...arguments)
  },
})

newData3.push(456) // 设置data的值
console.log(newData3)
