// this 指向函数被调用时包含函数的上下文

function test(name, age) {
  console.log("name:" + name)
  console.log("age:" + age)
  console.log("this.name:" + this.name)
  this.name = name
  this.age = age
  console.log("this.name:" + this.name)
  console.log("this.age:" + this.age)
}

const obj = {
  name: "Willem",
}

const newTest = test.bind(obj, "hhp")

newTest("lll", 25)


