//通过原型链判断
function isArray (arr) {
  return Object.prototype.toString.call(arr).substr(8, 5) === 'Array'
}
function isObject (obj) {
  return Object.prototype.toString.call(obj).substr(8, 6) === 'Object'
}
//深度克隆方法
function deepClone (obj) {
  if (isArray(obj) || isObject(obj)) {
    var o = isArray(obj) ? [] : {}
    for (let i in obj) {
      // for in会遍历自身和原型链上的属性，如不要原型链的属性可以用hasOwnProperty过滤原型链上的属性，因为hasOwnProperty只在自身属性查找
      if (obj.hasOwnProperty(i)) {
        o[i] = isArray(obj[i]) ? deepClone(obj[i]) : obj[i]
      }
    }
    return o
  } else {
    //不是数组和对象就返回
    return obj
  }
}

