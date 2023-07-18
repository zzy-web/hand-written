Function.prototype.myCall = function (_this = window, ...arguments) {//展开剩余参数   _this没传默认值为window
  // 将执行函数的this赋值给传进来的值
  _this.myFunc = this
  // 执行函数并存下返回值
  const result = _this.myFunc(...arguments)
  // 添加的函数置为null，可以让浏览器进行回收
  _this.myFunc = null
  return result
}

Function.prototype.myApply = function (_this = window, arr = []) {// _this没传默认值为window
  // 将执行函数的this赋值给传进来的值
  _this.myFunc = this
  // 执行函数并存下返回值
  const result = _this.myFunc(...arr)
  // 添加的函数置为null，可以让浏览器进行回收
  _this.myFunc = null
  return result
}

Function.prototype.myBind = function (_this = window, arr) {// _this没传默认值为window
  // 将执行函数的this赋值给传进来的值
  _this.myFunc = this
  // 执行函数并存下返回值
  const result = function () {
    _this.myFunc(...arr)
    // 添加的函数置为null，可以让浏览器进行回收
    _this.myFunc = null
  }
  return result
}
