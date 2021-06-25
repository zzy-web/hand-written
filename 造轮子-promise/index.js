/*
首先要知道promise的几个特性：
1. 有三个状态，pending（待定）  fulfilled（成功）   rejected（失败）
2. 调用resolve（）由状态pending变为fulfilled
3. 调用reject（）由状态pending变为rejected
4. 状态改变后不可逆，也就是pending变为fulfilled之后不能再改变，rejected同理
5. .then()有两个参数 ，第一个接收成功回调，第二个接收失败回调
6. .catch()一个参数，接收失败回调，如果.then()定义了第二个函数，这个catch将不执行
7. 链式调用，.then()的参数可以接收上一个.then return的东西 如果then要接收异步数据，只能是以promise对象return  .catch没有链式调用  
  如果返回一个新的promise对象，并且返回失败状态，则还可以继续使用catch或then的第二个参数接收   


8. Promise.all()  全部完成才完成返回值为一个Array<res>，如果一个失败就只走.catch()并且只返回第一个失败的reject返回值，不管其它 promise 是否完成。当传入空数组为同步，否则异步
9. Promise.allSettled()  返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。并且只会走.then()
10.Promise.any()  返回第一个成功的Promise,若都失败则在.catch中抛出Error
11.Promise.race() 返回第一个Promise,不管成功或失败  成功走then失败走catch
12.Promise.reject()方法返回一个带有拒绝原因的Promise对象。   catch
13.Promise.resolve()方法返回一个以给定值解析后的Promise 对象  then


*/

class MyPromise {
  constructor(excutorCallBack) {
    this.status = 'pending';
    this.value = undefined;
    this.fulfillAry = [];
    this.rejectedAry = [];
    //=>执行Excutor
    let resolveFn = result => {
      if (this.status !== 'pending') return;
      this.status = 'fulfilled';
      this.value = result;
      this.fulfillAry.forEach(item => item(this.value));
    };
    let rejectFn = reason => {
      if (this.status !== 'pending') return;
      this.status = 'rejected';
      this.value = reason;
      this.rejectedAry.forEach(item => item(this.value))
    };
    try {
      excutorCallBack(resolveFn, rejectFn);
    } catch (err) {
      //=>有异常信息按照rejected状态处理
      rejectFn(err);
    }
  }
  then (fulfilledCallBack, rejectedCallBack) {
    typeof fulfilledCallBack !== 'function' ? fulfilledCallBack = result => result : null;
    typeof rejectedCallBack !== 'function' ? rejectedCallBack = reason => {
      throw new Error(reason instanceof Error ? reason.message : reason);
    } : null

    return new MyPromise((resolve, reject) => {
      this.fulfillAry.push(() => {
        try {
          let x = fulfilledCallBack(this.value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err)
        }
      });
      this.rejectedAry.push(() => {
        try {
          let x = rejectedCallBack(this.value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err)
        }
      })
    });
  }
}