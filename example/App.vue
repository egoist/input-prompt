<template>
  <div id="app" class="container">
    <github slug="egoist/input-prompt"></github>
    <h1><span>Input Prompt</span> - ultra simple text auto-complete utility</h1>
    <div class="preview">
      <div class="row">
        <div class="column column-60">
          <prism class="example" language="javascript">{{ example }}</prism>
        </div>
        <div class="column column-40">
          <input ref="email" class="prompt" type="email" placeholder="Try to type your Gmail address...">
          <p class="tip">
            Press <kbd>→</kbd> or <kbd>tab</kbd> when prompt shows.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'prismjs'
import Github from 'vue-github-badge'
import Prism from 'vue-prism-component'
import InputPrompt from '../src'

const domains = [
  'gmail.com',
  'hotmail.com',
  'qq.com',
  'live.com',
  'outlook.com'
]

const example = `
const domains = [
  'gmail.com',
  'hotmail.com',
  'qq.com',
  'live.com',
  'outlook.com'
]

// which input element to control?
const prompt = new InputPrompt(document.getElementById('email'))

prompt.addRule({
  // execute this rule when input value matches the regular expression
  match: /([^@]+@)([^$]+)/,
  // return expected tip based on matched info
  handler(matched) {
    const RE = new RegExp('^' + matched[2])
    let result
    domains.forEach(domain => {
      if (RE.test(domain)) {
        result = matched[1] + domain
      }
    })
    return result
  }
})

prompt.init()
`.trim()

export default {
  data() {
    return {
      example
    }
  },
  mounted() {
    const prompt = new InputPrompt(this.$refs.email)
    prompt.addRule({
      match: /([^@]+@)([^$]+)/,
      handler: function (matched) {
        const RE = new RegExp('^' + matched[2])
        let result
        domains.forEach(domain => {
          if (RE.test(domain)) {
            result = matched[1] + domain
          }
        })
        return result
      }
    })
    prompt.init()
  },
  components: {
    Prism,
    Github
  }
}
</script>

<style src="prismjs/themes/prism.css"></style>
<style src="mingrid/dist/mingrid.css"></style>

<style>
body {
  font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

* {
  box-sizing: border-box;
}

kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: solid 1px #c6cbd1;
  border-bottom-color: #959da5;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #959da5;
}

h1 {
  margin-bottom: 30px;
}

h1 span {
  position: relative;
}

h1 span:after {
  height: 5px;
  right: 0;
  top: -5px;
  left: 0;
  display: block;
  content: '';
  background: #000;
  position: absolute;
}

.prompt {
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
}

.prompt:focus {
  border-color: #666
}

.preview {
  display: flex;
  flex-direction: row;
}

pre.example {
  background-color: white;
  margin: 0;
  padding: 0;
}

.tip {
  color: #666;
  font-size: 13px;
}
</style>
