// 要求  "abcd".f()==>"a-b-c-d"
//这里不能用箭头函数，否则this会指向window
String.prototype.f = function () {
  return this.split('').join('-')
}
'abcd'.f()   //a-b-c-d
