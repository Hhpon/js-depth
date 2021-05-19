function SuperType() {
  this.property = true
  this.colors = ["red"]
}

SuperType.prototype.getSuperValue = function () {
  return this.colors
}

function SubType() {
  this.subproperty = false
}

SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function () {
  return this.subproperty
}

let instance = new SubType()
instance.property = false
instance.colors = ["green"]
console.log(instance.getSuperValue())
let instance1 = new SubType()
console.log(instance1.getSuperValue())
