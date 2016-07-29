var expect = chai.expect
var simulate = require('simulate-event').simulate

function createExample() {
  var example = document.createElement('div')
  document.body.appendChild(example)
  return example
}

function trigger(el, eventName, payload) {
  const event = new CustomEvent(eventName, {detail: payload})
  el.dispatchEvent(event)
}

describe('main', function () {
  it('insert new fake input element', function () {
    var example = createExample()

    var input = document.createElement('input')
    example.appendChild(input)

    var prompt = new InputPrompt(input)
    prompt.init()
    var fake = example.querySelector('.fake-input')
    expect(fake).to.be.ok
  })

  it('update fake value while typing', function () {
    var example = createExample()

    var input = document.createElement('input')
    example.appendChild(input)

    var prompt = new InputPrompt(input)
    prompt.init()

    // update input value
    input.value = 'foo'
    simulate(input, 'input')

    expect(example.querySelector('.fake-input').value).to.equal('foo')
  })

  it('update prompt when rule matches', function () {
    var example = createExample()

    var input = document.createElement('input')
    example.appendChild(input)

    var prompt = new InputPrompt(input)
    prompt.addRule({
      test: /^g$/,
      handler: function () {
        return 'google'
      }
    })
    prompt.init()

    input.value = 'g'
    simulate(input, 'input')

    expect(example.querySelector('.fake-input').value).to.equal('google')
  })
})
