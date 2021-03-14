"use static"

function throttle(deply, fn) {
  let timer
  return function () {
    console.log(timer)
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      clearTimeout(timer)
      timer = null
    }, deply)
  }
}

function mouseMove(e) {
  console.log(e);
  console.log("move")
}

document.querySelector("#panel").addEventListener("mousemove", throttle(1000, mouseMove))
