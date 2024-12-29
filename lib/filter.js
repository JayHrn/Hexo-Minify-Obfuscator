'use strict'

const minimatch = require('minimatch')
// minify js
const terser = require('terser')
// obfuscator js
const JavaScriptObfuscator = require('javascript-obfuscator');
// minify css
const CleanCSS = require('clean-css')
// minify html
const htmlnano = require('htmlnano');

function excludeHandler(excludePath, path) {
  const exclude = typeof excludePath === 'string' ? [excludePath] : excludePath || []
  return exclude.some((item) => minimatch(path, item, { matchBase: true }))
}

async function minifyJS(hexo, str, data) {
  const config = hexo.config.minifyObfuscator
  let { exclude, options } = config.js.minify
  if (excludeHandler(exclude, data.path)) return str
  if (!options) options = {}

  const result = await terser.minify(str, options)
  return result.code
}

async function obfuscatorJS(hexo, str, data) {
  const config = hexo.config.minifyObfuscator
  let { exclude, options } = config.js.obfuscator
  if (excludeHandler(exclude, data.path)) return str
  if (!options) options = {}

  const result = await JavaScriptObfuscator.obfuscate(str, options)
  return result.getObfuscatedCode()
}

async function minifyObfuscatorJS(str, data) {
  const hexo = this
  const config = hexo.config.minifyObfuscator
  const minifyEnable = config.js.minify.enable
  const obfuscatorEnable = config.js.obfuscator.enable

  if (!minifyEnable && !obfuscatorEnable) return str
  if (minifyEnable && obfuscatorEnable) {
    return await minifyJS(hexo, await obfuscatorJS(hexo, str, data), data)
  } else if (minifyEnable) {
    return await minifyJS(hexo, str, data)
  } else if (obfuscatorEnable) {
    return await obfuscatorJS(hexo, str, data)
  }
}

function minifyCSS(str, data) {
  const config = this.config.minifyObfuscator
  let { enable, exclude, options } = config.css
  if (!enable || excludeHandler(exclude, data.path)) return str
  if (!options) options = {}

  const result = new CleanCSS(options).minify(str)
  return result.styles
}

async function minifyHTML(str, data) {
  const config = this.config.minifyObfuscator
  let { enable, exclude, options } = config.html
  if (!enable || excludeHandler(exclude, data.path)) return str
  if (!options) options = {}

  const result = await htmlnano.process(str, options)
  return result.html
}

module.exports = { minifyObfuscatorJS, minifyCSS, minifyHTML }