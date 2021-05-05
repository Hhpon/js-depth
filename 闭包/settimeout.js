/**
 * 模拟块级作用域
 */
for (var i = 0; i < 5; i++) {
  ;(function (x) {
    setTimeout(() => {
      console.log(x++)
    }, 4000)
  })(i)
}
