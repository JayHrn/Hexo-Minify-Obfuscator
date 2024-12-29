/**
 * hexo-minify-obfuscator
 * @author JayHrn
 */

'use strict'

const merge = require('merge-deep')
const { minifyObfuscatorJS, minifyCSS, minifyHTML } = require('./lib/filter')

const defaultConfig = {
  enable: false,
  previewNotice: false,
  js: {
    minify: {
      enable: false,
      exclude: [],
      options: {}
    },
    obfuscator: {
      enable: false,
      exclude: [],
      options: {}
    }
  },
  css: {
    enable: false,
    exclude: [],
    options: {}
  },
  html: {
    enable: false,
    exclude: [],
    options: {}
  }
}

hexo.config.minifyObfuscator = merge(defaultConfig, hexo.config.minifyObfuscator)

const minifyObfuscatorEnable = hexo.config.minifyObfuscator.enable

if (minifyObfuscatorEnable) {
  if (hexo.config.minifyObfuscator.previewNotice && ['g', 'generate'].includes(hexo.env.cmd)) {
    hexo.log.info(`Hi, hexo-minify-obfuscator!`);
  }

  hexo.extend.filter.register('after_render:js', minifyObfuscatorJS)

  hexo.extend.filter.register('after_render:css', minifyCSS)

  hexo.extend.filter.register('after_render:html', minifyHTML)
}
