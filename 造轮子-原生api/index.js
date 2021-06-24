Array.prototype.myForEach = function (func) {
  for (let i = 0; i < this.length; i++) {
    func(this[i], i, this)
  }
}


Array.prototype.myMap = function (func) {
  for (let i = 0; i < this.length; i++) {
    this[i] = func(this[i], i, this)
  }
  return this
}

Array.prototype.myFilter = function (func) {
  let arr = []
  for (let i = 0; i < this.length; i++) {
    let flag = func(this[i], i, this)
    if (flag) {
      arr = [...arr, this[i]]
    }
  }
  return arr
}