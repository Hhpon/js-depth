Function.prototype.selfApply = selfApply

const expect = chai.expect

describe("bind 方法的测试", function () {
  it("bind应该改变函数的this指向", function () {
    function printUserInfo() {
      console.log(this.name)
      console.log(this.age)
      return this.name
    }

    const user = { name: 'andy', age: 50 }

    expect(printUserInfo.selfApply(user)).to.be.an('andy')
  })
})