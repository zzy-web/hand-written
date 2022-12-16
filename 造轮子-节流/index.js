function $(e) {
  return document.querySelector(e)
}
function throttle(func, wait = 1500, immediate) {
  let timer = null
  let isImmediate = true
  return function () {
    if (immediate && isImmediate) {
      isImmediate = false
      func()
    } else {
      if (timer) return
      timer = setTimeout(() => {
        func()
        clearTimeout(timer)
        timer = null
      }, wait)
    }


  }
}
