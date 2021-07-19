function $ (e) {
  return document.querySelector(e)
}
let flag = false,
  timer = null

//节流原理：在一定时间内，只能触发一次
function throttle (func, wait = 1500) {
  if (!flag) {
    flag = true
    typeof func === 'function' && func()
    timer = setTimeout(() => {
      flag = false
    }, wait)
  }
}

