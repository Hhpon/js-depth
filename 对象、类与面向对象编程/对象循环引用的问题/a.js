import B from "./b.js"

export default class A {
  constructor() {
    this.b = new B()
    console.log(this.b)
  }
}

window.A = A
