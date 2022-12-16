function $(e) {
  return document.querySelector(e)
}

function debounce(func, wait = 500, immediate) {
  let timer = null
  let isImmediate = true
  return function () {
    if (immediate && isImmediate) {
      isImmediate = false
      func()
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func()
        clearTimeout(timer = null)
        timer = null
      }, wait)
    }
  }
}
