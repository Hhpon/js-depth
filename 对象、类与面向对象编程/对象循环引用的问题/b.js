import A from "./a.js"

export default class B {
  constructor() {
    this.a = new A()
    console.log(this.a)
  }
}
