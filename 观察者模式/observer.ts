class Observer {
  update() {
    //  do something
    console.log("收到通知")
  }
}

class Subject {
  observerLists: Observer[] = []

  publish() {
    this.observerLists.forEach((observer) => {
      observer.update()
    })
  }
  trigger(observer: Observer) {
    this.observerLists.push(observer)
  }
}

const observer = new Observer()
const subject = new Subject()

subject.trigger(observer)

subject.publish()  //收到通知
