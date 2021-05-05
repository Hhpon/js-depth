function doit() {
  const a = 1
  return function () {
    return a
  }
}

const outa = doit()
console.log(outa())
