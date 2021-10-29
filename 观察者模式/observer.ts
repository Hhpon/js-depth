class Observer {
  constructor() {}

  update() {
    console.log("update")
  }
}

class Subject {
  observerList: Observer[]
  constructor() {
    this.observerList = []
  }
  triger(observer) {
    this.observerList.push(observer)
  }
  publish() {
    this.observerList.forEach((observer) => observer.update())
  }
}
