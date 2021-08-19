const selfApply = require('../review-apply4.js')

Function.prototype.selfApply = selfApply

function printUserInfo() {
  console.log(this.name)
  console.log(this.age)
}

// window.name = '梁朝伟'
// window.age = 60

const user = { name: '刘德华', age: 50 }

// printUserInfo.selfApply()
console.log(this)