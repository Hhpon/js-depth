function selfSetInterval(fn, deply) {
  let isOver = false
  let timer
  function interval() {
    timer = setTimeout(() => {
      fn()
      if (!isOver) {
        interval()
      }
    }, deply);
  }
  interval()
  return () => { isOver = true; clearTimeout(timer) }
}

const a = selfSetInterval(() => {
  console.log('object');
}, 1000)

setTimeout(() => {
  a()
}, 5500);