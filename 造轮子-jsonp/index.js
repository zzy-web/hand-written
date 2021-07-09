// isArray (arr) {
//   return Object.prototype.toString.call(arr).substr(8, 5) === 'Array'
// }
function objToUrl (obj) {
  let paramsArr = []
  let uri = ''
  for (let i in obj) {
    paramsArr.push(i + "=" + obj[i])
  }
  if (paramsArr.length) {
    uri = '?' + paramsArr.join("&")
  }
  return uri
}
function isObject (obj) {
  return Object.prototype.toString.call(obj).substr(8, 6) === 'Object'
}
function checkOptions (options) {
  if (typeof options.url !== 'string') {
    this._throw('the address must be a string')
  }

  if (!isObject(options.data)) {
    this._throw('the data must be a object')
  }
}
function _throw (text) {
  throw new Error(text)
}
function $ (el) {
  return document.querySelector(el)
}
function jsonp (options) {
  checkOptions(options)
  console.log(123)
  let jsonpFnName = 'func' + Math.random().toString().replace('.', '');
  options.data.jsonpFnName = jsonpFnName
  let script = document.createElement('script')
  script.src = options.url + objToUrl(options.data)
  window[jsonpFnName] = function (data) {
    options.success && options.success(data)
    document.body.removeChild(script)
    window[jsonpFnName] = null
  }
  document.body.appendChild(script)
}