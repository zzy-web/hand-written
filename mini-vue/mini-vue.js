// 改变数组的7个方法
// arr.push()
// arr.pop()
// arr.unshift()
// arr.shift()

// arr.splice()
// arr.reverse())
// arr.sort()
function $ (e) {
  return document.querySelector(e)
}
//通过原型链判断
function isArray (arr) {
  return Object.prototype.toString.call(arr).substr(8, 5) === 'Array'
}
function isObject (obj) {
  return Object.prototype.toString.call(obj).substr(8, 6) === 'Object'
}
function defineReactive (obj, key, val) {
  observe(val)  //递归
  Object.defineProperty(obj, key, {
    get () {
      console.log('get', val)
      return val
    },
    set (v) {
      if (v !== val) {
        v = val
        observe(v)//当用户赋值一个全新的对象时，也要做响应式处理
        console.log('set', key)
      }
    }
  })
}
function observe (obj) {
  if (isArray(obj) || isObject(obj)) {
    Object.keys(obj).forEach(_key => {
      defineReactive(obj, _key, obj[_key])
    })
  } else {
    return obj
  }

}
function proxy (vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get () {
        return vm.$data[key]
      },
      set (v) {
        vm.$data[key] = v
        console.log(111, v)
      }
    })
  })
}
class MiniVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    // 对data做响应式处理
    this.$data = options.data
    observe(this.$data)
    //代理，将data中的属性绑定到Vue实例上去
    proxy(this)
    new Compile(this)
  }
  $set (obj, key, val) {
    defineReactive(obj, key, val)
  }
}

class Compile {
  constructor(vm) {
    this.$vm = vm
    this.el = vm.$options.el
    this.compileFn($(this.el))
  }
  compileFn (el) {
    // 遍历el
    // 1.获取el所有子节点
    el.childNodes.forEach(node => {
      // console.log({ node })
      // 判断类型
      if (node.nodeType === 1) {
        console.log('元素', node.nodeName)
        //编译元素上的属性
        this.compileElement(node)
        // 元素
        if (el.childNodes.length) {
          this.compileFn(node)
        }
      } else if (this.isInter(node)) {
        console.log('text', node.textContent)
        this.compileText(node)
        // 插值文本
      }
    })
  }
  compileText (node) {
    node.textContent = this.$vm[RegExp.$1]
  }
  compileElement (node) {
    console.log({ node })
    // node.attributes是个伪数组
    Array.from(node.attributes).forEach(attr => {
      if (attr.name.startsWith('v-')) {
        // 指令处理函数
        let dir = attr.name.slice(2)
        //判断该函数是否存在。存在则执行
        this[dir] && this[dir](node, attr.value)
      }
    })
  }
  // v-text
  text (node, val) {
    node.innerText = this.$vm[val]
  }
  //v-html
  html (node, val) {
    node.innerHTML = this.$vm[val]
  }
  isInter (node) {
    let reg = /\{\{(.*)\}\}/
    return node.nodeType === 3 && reg.test(node.textContent)
  }
}
