window.identity = "The Window"
let object = {
  identity: "My Object",
  testIdentity: this.identity,
  getIdentityFunc: () => {
    console.log(this.identity)
  },
  getIdentityFunc1() {
    return function () {
      console.log(this.identity)
    }
  },
  getIdentityFunc2() {
    function doit() {
      console.log(this.identity)
    }
    return doit
  },
  getIdentityFunc3() {
    const doit = () => {
      console.log(this.identity)
    }
    return doit
  },
}

object.getIdentityFunc() // The Window
object.getIdentityFunc1()() // The Window
object.getIdentityFunc2()() // The Window 
object.getIdentityFunc3()() // My Object

let object1 = {
  identity: "My Object1",
  getIdentityFunc1: object.getIdentityFunc1(),
  getIdentityFunc2: object.getIdentityFunc2(),
}

object1.getIdentityFunc1()
object1.getIdentityFunc2()

// window.identity = "The Window"
// let object = {
//   identity: "My Object",
//   getIdentityFunc() {
//     console.log(this.identity)
//   },
// }
// let object1 = {
//   identity: "My Object1",
// }

// object.getIdentityFunc.call(object1) // My Object1

// window.identity = "The Window"

// function Obj() {
//   this.identity = "My Object"

//   this.getIdentityFunc = function () {
//     console.log(this.identity)
//   }

//   this.getIdentityFunc1 = () => {
//     console.log(this.identity)
//   }
// }

// const obj = new Obj()
// obj.getIdentityFunc()
// obj.getIdentityFunc1()
