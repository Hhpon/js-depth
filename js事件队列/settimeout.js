// setTimeout(() => {
//   console.log("10s")
// }, 10000)

// setTimeout(() => {
//   console.log("5s")
// }, 5000)

setImmediate(function A() {
  console.log(1);
  setImmediate(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0);