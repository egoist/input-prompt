const keys = {
  right: 39,
  tab: 9
}

function css(el, style) {
  for (const key in style) {
    el.style[key] = style[key]
  }
}

export default class InputPrompt {
  constructor(el) {
    this.el = el
    this.rules = []
  }

  addRule({test, handler}) {
    this.rules.push({
      test,
      handler
    })
  }

  init() {
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'input-prompt'
    css(this.wrapper, {
      position: 'relative',
      height: `${this.el.clientHeight}px`
    })

    this.el.parentNode.insertBefore(this.wrapper, this.el)
    this.el.parentNode.removeChild(this.el)
    this.wrapper.appendChild(this.el)
    css(this.el, {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'transparent'
    })

    this.fakeEl = document.createElement(this.el.tagName)
    this.fakeEl.className = `${this.el.className} fake-input`
    css(this.fakeEl, {
      position: 'absolute',
      left: `${this.el.offsetLeft}px`,
      zIndex: 0,
      color: '#999'
    })
    this.wrapper.appendChild(this.fakeEl)

    this.el.addEventListener('input', e => {
      this.currentValue = e.target.value
      this.applyRule()
    }, false)

    this.el.addEventListener('keydown', e => {
      if (e.which === keys.right || e.which === keys.tab) {
        if (this.el.value !== this.fakeEl.value) {
          e.preventDefault()
          this.el.value = this.fakeEl.value
        }
      }
    }, false)
  }

  applyRule() {
    let result = this.currentValue
    this.rules.forEach(rule => {
      if (rule.test.test(this.currentValue)) {
        result = rule.handler(result)
      }
    })
    this.fakeEl.value = result
  }
}
