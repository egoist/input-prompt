<template>
  <div id="app" class="container">
    <github slug="egoist/input-prompt"></github>
    <h1><span>Input Prompt</span> - ultra simple text auto-complete utility</h1>
    <div class="preview">
      <div class="row">
        <div class="column column-50">
          <prism class="example" language="javascript">{{ example }}</prism>
        </div>
        <div class="column column-50">
          <input ref="email" class="prompt" type="email" placeholder="Try to type your Gmail address...">
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
  // return expected tip based on macthed info
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
</style>
