class Dep {
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

class Observer {
  update() {
    //  do something
    console.log("收到通知")
  }
}

class Subject {
  deps: Dep[] = []
  change() {
    this.deps.forEach((dep) => dep.publish())
  }
  depend(dep: Dep) {
    this.deps.push(dep)
  }
}

const observer = new Observer()
const subject = new Subject()
const dep = new Dep()

subject.depend(dep) // 发布者关联消息中心
dep.trigger(observer) // 观察者关联消息中心
subject.change() // 收到通知
