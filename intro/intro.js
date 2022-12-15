
export default class Intro {
  constructor(defaultSetps) {
    this.defaultOption = {
      prevLabel: '上一步',
      nextLabel: '下一步',
      skipLabel: '跳过',
      doneLabel: '结束'
    }
    this.step = 0
    this.defaultSetps = defaultSetps || []
    this.element = null
    this.card = null
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.resize = this.resize.bind(this)
    this.end = this.end.bind(this)
    this.getDom = this.getDom.bind(this)
  }

  getDom(el) {
    return document.querySelector(el)
  }
  start=()=> {
    console.log(this);
    if (this.defaultSetps && this.defaultSetps.length) {
      this.render()
    } else {
      throw new Error('KFC Crazy Thursday need 50$')
    }
  }
  end() {
    this.getDom('.intro-next').removeEventListener('click', this.next)
    this.getDom('.intro-prev').removeEventListener('click', this.prev)
    this.getDom('.intro-skip').removeEventListener('click', this.end)
    this.getDom('.intro-done').removeEventListener('click', this.end)

    window.removeEventListener('resize', this.resize)
    this.getDom('body').removeChild(this.element)
  }

  setOptions(defaultOption) {
    this.defaultOption = {
      ...this.defaultOption,
      ...defaultOption
    }
    return this
  }
  setElement() {
    const boundingClientRect = this.getDom(this.defaultSetps[this.step].element).getBoundingClientRect()
    this.element.style.height = boundingClientRect.height + 'px'
    this.element.style.width = boundingClientRect.width + 'px'
    this.element.style.top = boundingClientRect.top + 'px'
    this.element.style.left = boundingClientRect.left + 'px'
  }
  next() {
    this.step += 1
    this.getDom()
    this.resize()
    this.setButtonDisable()
  }
  prev() {
    this.step -= 1
    this.resize()
    this.setButtonDisable()

  }
  resize() {
    this.setElement()
    this.setPosition()
  }
  setButtonDisable() {
    const prevBtn = this.getDom('.intro-prev')
    const nextBtn = this.getDom('.intro-next')
    const doneBtn = this.getDom('.intro-done')
    if (this.step === 0) {
      prevBtn.style.display = "none"
      nextBtn.style.display = "block"
      doneBtn.style.display = "none"
    } else if (this.step === this.defaultSetps.length - 1) {
      prevBtn.style.display = "block"
      nextBtn.style.display = "none"
      doneBtn.style.display = "block"
    } else {
      prevBtn.style.display = "block"
      nextBtn.style.display = "block"
      doneBtn.style.display = "none"
    }
  }
  setPosition() {
    switch (this.defaultSetps[this.step].position) {
      case 'top':
        this.card.style.top = "-200px"
        this.card.style.left = "50%"
        this.card.style.bottom = "auto"
        this.card.style.right = "auto"
        this.card.style.transform = 'translateX(-50%)'
        break
      case 'bottom':
        this.card.style.bottom = "-200px"
        this.card.style.left = "50%"
        this.card.style.top = "auto"
        this.card.style.right = "auto"
        this.card.style.transform = 'translateX(-50%)'
        break
      case 'left':
        this.card.style.left = "-200px"
        this.card.style.top = "50%"
        this.card.style.bottom = "auto"
        this.card.style.right = "auto"
        this.card.style.transform = 'translateY(-50%)'
        break
      case 'right':
        this.card.style.right = "-200px"
        this.card.style.top = "50%"
        this.card.style.bottom = "auto"
        this.card.style.left = "auto"
        this.card.style.transform = 'translateY(-50%)'
    }
    const introCardTextDom = this.getDom('.intro-card-text')
    if (introCardTextDom) {
      introCardTextDom.innerHTML = this.defaultSetps[this.step].intro
    }
  }
  setCard() {
    this.setPosition()
    this.card.innerHTML = `
    <div class="intro-card-content">
      <div class="intro-card-top" >
        <div>${this.defaultSetps[this.step].title}</div>
        <div class="intro-skip">${this.defaultOption.skipLabel}</div>
      </div>
      <div class="intro-card-text">
        ${this.defaultSetps[this.step].intro}
      </div>
      <div style="display: flex;justify-content: space-between;">
        <div>
          <div class="intro-prev"> ${this.defaultOption.prevLabel}</div>
        </div>
        <div>
          <div class="intro-next"> ${this.defaultOption.nextLabel}</div>
          <div class="intro-done"> ${this.defaultOption.doneLabel}</div>
        </div>
      </div>
    </div>`

  }
  render() {
    //内容
    const element = document.createElement('div')
    element.className = 'intro-content'
    this.element = element
    this.setElement()

    //提示卡片
    const card = document.createElement('div')
    card.className = 'intro-card'
    this.card = card
    this.setCard()

    element.appendChild(card)
    this.getDom('body').appendChild(element)
    this.setButtonDisable()
    this.getDom('.intro-next').addEventListener('click', this.next)
    this.getDom('.intro-prev').addEventListener('click', this.prev)
    this.getDom('.intro-skip').addEventListener('click', this.end)
    this.getDom('.intro-done').addEventListener('click', this.end)
    window.addEventListener('resize', this.resize)
  }
}