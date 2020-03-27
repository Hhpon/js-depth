abstract class Animal {
  readonly name: string
  public constructor(name: string) {
    this.name = name
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name)
  }
}

let cat = new Cat("tom")

const arr: Array<any> = [1, "123"]

// function createArray<Q>(length: number, value: Q): Array<Q> {
//   let result: Q[] = []
//   for (let i = 0; i < length; i++) {
//     result[i] = value
//   }
//   return result
// }

// createArray<string>(3, "x")

interface Lengthwise {
  length: number
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentity('123')

// 思考：为什么不直接用类型定义呢？ 直接把T替换成Lengthwise？原因是参数对象不只包含length一个属性
// 总结： 继承本身其实就含有从父类拓展的意思
// 继承可以实现接口的任意属性的功能

interface createArrayFunc {
  <T>(length: number, value: T): Array<T>
}

const createArray: createArrayFunc = function<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
