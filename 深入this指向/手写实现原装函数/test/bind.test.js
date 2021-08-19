const selfApply = require('../review-apply4.js')

Function.prototype.selfApply = selfApply

function printUserInfo() {
  console.log(this.name)
  console.log(this.age)
}

const user = { name: 'andy', age: 50 }

printUserInfo.selfApply(user)