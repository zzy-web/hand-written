function $ (e) {
  return document.querySelector(e)
}
let flag = false, timer = null

// 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
function debounce (func, wait = 500) {
  //因为只要执行最后一次函数，所以要清除定时器，防止重复执行
  timer !== null && clearTimeout(timer)
  if (!flag) {
    timer = setTimeout(() => {
      typeof func === "function" && func()
      timer = null
    }, wait)
  }
}
