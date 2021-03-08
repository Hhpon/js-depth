class Person {
  constructor() {
    this.locate = () => console.log("instance")
  }
}

let p = new Person()

p.locate()
