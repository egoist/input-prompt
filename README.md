# input-prompt [![NPM version](https://img.shields.io/npm/v/input-prompt.svg)](https://npmjs.com/package/input-prompt) [![NPM downloads](https://img.shields.io/npm/dm/input-prompt.svg)](https://npmjs.com/package/input-prompt) [![Build Status](https://img.shields.io/circleci/project/egoist/input-prompt/master.svg)](https://circleci.com/gh/egoist/input-prompt)

> Input prompt with auto-completion, an ultra simple alternative to Typeahead.js

## Install

```bash
$ npm install --save input-prompt
```

`input-prompt` does not do anything by default, but you can write rules to achieve something interesting, see usage below.

## Usage

```js
const InputPrompt = require('input-prompt')

// which input element to control?
const prompt = new InputPrompt(document.getElementById('email'))

// I want to auto-complete gmail address when user is typing...
prompt.addRule({
  // execute this rule when input value passed the regular expression
  test: /[^@]+@[^$]+/,
  handler(input) {
    // how you would like to update the input value
    // here we simply make it a full @gmail.com address
    const hint = input.match(/([^@]+@)([^$]+)/)
    if (hint[2][0] === 'g') {
      return `${hint[1]}gmail.com`
    }
    return input
  }
})

// initial the element
prompt.init()
// cheers! 🍻
```

When the prompt shows you can press <kbd>→</kbd> or <kbd>tab</kbd> to apply it to the real `input` element.

A live example: https://egoistian.com/input-prompt

## List of plugins

You can wrap your rule into a plugin and publish it on npm, if you did you're welcome to add it here.

## License

MIT © [EGOIST](https://github.com/egoist)
