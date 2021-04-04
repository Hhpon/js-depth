for (var i = 0; i < 5; i++) {
  ;(function (x) {
    setTimeout(() => {
      console.log(x++)
    }, 4000)
  })(i)
}
