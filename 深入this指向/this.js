window.identity = "The Window"

let object = {
  identity: "My Object",
  testThis: this.identity,
  getIdentityFunc() {
    console.log(this.identity)
  },
  getIdentityFunc1: () => {
    console.log(this.identity)
  },
  getIdentityFunc2: () => {
    function innerFunction() {
      console.log(this.identity)
    }
    innerFunction()
  },
  getIdentityFunc3() {
    return function () {
      console.log(this.identity)
    }
  },
  getIdentityFunc4() {
    return () => {
      console.log(this.identity)
    }
  },
  getIdentityFunc5: () => {
    return function () {
      console.log(this.identity)
    }
  },
  getIdentityFunc6: () => {
    return () => {
      console.log(this.identity)
    }
  },
  getIdentityFunc7() {
    function innerFunction() {
      console.log(this.identity)
    }
    innerFunction()
  },
  getIdentityFunc8() {
    const innerFunction = () => {
      console.log(this.identity)
    }
    innerFunction()
  },
}

object.getIdentityFunc()
let getIdentityFunc = object.getIdentityFunc
getIdentityFunc()

object.getIdentityFunc1()
let getIdentityFunc1 = object.getIdentityFunc1
getIdentityFunc1()

object.getIdentityFunc2()
let getIdentityFunc2 = object.getIdentityFunc2
getIdentityFunc2()

object.getIdentityFunc3()()
let getIdentityFunc3 = object.getIdentityFunc3()
getIdentityFunc3()

object.getIdentityFunc4()()
let getIdentityFunc4 = object.getIdentityFunc4()
// getIdentityFunc4() 方法执行的时候this其实已经由上一步固定住了
getIdentityFunc4()

object.getIdentityFunc5()()
let getIdentityFunc5 = object.getIdentityFunc5()
getIdentityFunc5()

object.getIdentityFunc6()()
let getIdentityFunc6 = object.getIdentityFunc6()
getIdentityFunc6()

object.getIdentityFunc7()
let getIdentityFunc7 = object.getIdentityFunc7
getIdentityFunc7()

object.getIdentityFunc8()
let getIdentityFunc8 = object.getIdentityFunc8
getIdentityFunc8()
