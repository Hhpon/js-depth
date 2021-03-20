let uid = 0

// 用于存储订阅者并发布消息  消息中心
class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach((sub) => sub.update())
  }
}

Dep.target = null
