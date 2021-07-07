//创建Person构造函数，参数为name,age
// function Person (name, age) {
//   this.name = name;
//   this.age = age;
// }

function _new (Fn, ...params) {
  // 1.拷贝Person构造函数的原型链上的方法，创建一个对象使obj.__proto__=Fn.prototype
  let obj = Object.create(Fn.prototype);
  // 2.将构造函数的属性拷贝到obj,相当于在Person构造函数里将this改为obj,所以隐式的设置了obj的属性==》obj.name=name;obj.age=age
  Fn.call(obj, ...params)
  return obj
}



