"use strict"

class Foo {
  [Symbol.iterator]() {
    return {
      next() {
        return { done: false, value: "foo" }
      },
    }
  }
}

let f = new Foo()

const iter1 = f[Symbol.iterator]()

console.log(iter1.next())
