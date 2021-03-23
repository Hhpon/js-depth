var name = 'hhp'
const test = {
  name: "Bill",
  show1: function () {
    console.log(this.name)
  },
  show2: () => {
    console.log(this.name)
  },
  show3: () => {
    function innerFunction() {
      console.log(this.name)
    }
    innerFunction()
  },
}
test.show1()
test.show2()
test.show3()
