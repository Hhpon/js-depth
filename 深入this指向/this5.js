window.identity = "The Window"
let object = {
    identity: 'My Object',
    testIdentity: this.identity,
    getIdentityFunc:() => {
        console.log(this.identity)
    }
}
console.log(object.testIdentity)  // The Window
object.getIdentityFunc()  // The Window
object.getIdentityFunc.call(object)  // The Window