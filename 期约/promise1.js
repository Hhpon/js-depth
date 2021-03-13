let p = Promise.resolve()

p.then(() => console.log("onResolved handler"))

console.log("then() returns" )
