function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    get () {
      console.log('get', val)
      return val
    },
    set (v) {
      if (v !== val) {
        v = val
        console.log('set', key)
      }
    }
  })
}


