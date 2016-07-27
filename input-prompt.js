(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.InputPrompt = factory());
}(this, function () { 'use strict';

  var keys = {
    right: 39,
    tab: 9
  }

  function css(el, style) {
    for (var key in style) {
      el.style[key] = style[key]
    }
  }

  var InputPrompt = function InputPrompt(el) {
    this.el = el
    this.rules = []
  };

  InputPrompt.prototype.addRule = function addRule (ref) {
      var test = ref.test;
      var handler = ref.handler;

    this.rules.push({
      test: test,
      handler: handler
    })
  };

  InputPrompt.prototype.init = function init () {
      var this$1 = this;

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'input-prompt'
    css(this.wrapper, {
      position: 'relative',
      height: ((this.el.clientHeight) + "px")
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
    this.fakeEl.className = this.el.className
    css(this.fakeEl, {
      position: 'absolute',
      left: ((this.el.offsetLeft) + "px"),
      zIndex: 0,
      color: '#999'
    })
    this.wrapper.appendChild(this.fakeEl)

    this.el.addEventListener('input', function (e) {
      this$1.currentValue = e.target.value
      this$1.applyRule()
    }, false)

    this.el.addEventListener('keydown', function (e) {
      if (e.which === keys.right || e.which === keys.tab) {
        e.preventDefault()
        this$1.el.value = this$1.fakeEl.value
      }
    }, false)
  };

  InputPrompt.prototype.applyRule = function applyRule () {
      var this$1 = this;

    var result = this.currentValue
    this.rules.forEach(function (rule) {
      if (rule.test.test(this$1.currentValue)) {
        result = rule.handler(result)
      }
    })
    this.fakeEl.value = result
  };

  return InputPrompt;

}));