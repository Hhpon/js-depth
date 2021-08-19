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

    expect(printUserInfo.selfApply(user)).to.be.equal('andy')
  })

  it("bind的第一个参数为undefined的时候，this指向应该是window", function () {
    function printUserInfo1() {
      console.log(this.name)
      console.log(this.age)
    }
    var name = '梁朝伟'
    var age = 60

    const user1 = { name: '刘德华', age: 50 }
    console.log(this)

    expect(printUserInfo1.selfApply()).to.be.equal('梁朝伟')
  })
})