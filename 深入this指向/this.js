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
    console.log(this.identity)
    function innerFunction() {
      console.log(this)
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

object.getIdentityFunc() // My Object
let getIdentityFunc = object.getIdentityFunc
getIdentityFunc() // The Window

object.getIdentityFunc1() // The Window
let getIdentityFunc1 = object.getIdentityFunc1
getIdentityFunc1() // The Window

object.getIdentityFunc2() // The Window
let getIdentityFunc2 = object.getIdentityFunc2
getIdentityFunc2() // The Window

object.getIdentityFunc3()() // The Window
let getIdentityFunc3 = object.getIdentityFunc3()
getIdentityFunc3() // The Window

object.getIdentityFunc4()() // My Object
let getIdentityFunc4 = object.getIdentityFunc4()
getIdentityFunc4() // My Object

object.getIdentityFunc5()() // The Window
let getIdentityFunc5 = object.getIdentityFunc5()
getIdentityFunc5() // The Window

object.getIdentityFunc6()() // The Window
let getIdentityFunc6 = object.getIdentityFunc6()
getIdentityFunc6() // The Window

object.getIdentityFunc7()

object.getIdentityFunc8()
