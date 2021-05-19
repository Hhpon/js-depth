var PENDING = "pending"
var FULFILLED = "fulfilled"
var REJECTED = "rejected"

function MyPromise(fn) {
  this.status = PENDING
  this.value = null
  this.reason = null
}

MyPromise.prototype.resolve = function () {}
