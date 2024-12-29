<div align="right">
  语言: 中文
  <a title="English" href="/README.md">English</a>
</div>

## hexo-minify-obfuscator

`hexo-minify-obfuscator` 是一款 Hexo 压缩插件，他支持压缩 HTML、CSS、JS、同时支持混淆JS

- **压缩HTML**：[htmlnano](https://github.com/posthtml/htmlnano)
- **压缩CSS**：[clean-css](https://github.com/clean-css/clean-css)
- **压缩JS**：[terser](https://github.com/terser/terser)
- **混淆JS**：[javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)

## 安装

```bash
npm install hexo-minify-obfuscator --save
```

## 配置

> 请在Hexo配置文件中填写如下配置

```yml
# hexo-minify-obfuscator 默认配置
minifyObfuscator:
  enable: true # 是否开启代码压缩
  previewNotice: true # 本地预览时是否显示压缩通知
  exclude: ['*.min.*']
  js: # 压缩混淆JS，如果可以单独开启，如果同时开启，将先混淆后压缩
    minify: # 压缩JS
      enable: true
      exclude: [] # 排除你不想处理的文件，例如['index.min.js','a.min.js']
      # 详细配置: https://github.com/terser/terser
      options: {}
    obfuscator: # 混淆JS
      enable: true
      exclude: [] # 排除你不想处理的文件
      # 详细配置: https://github.com/javascript-obfuscator/javascript-obfuscator
      options: {}
  css: # 压缩CSS
    enable: true
    exclude: [] # 排除你不想处理的文件
    # 详细配置: https://github.com/clean-css/clean-css
    options: {}
  html: # 压缩HTML
    enable: true
    exclude: [] # 排除你不想处理的文件
    # 详细配置: https://github.com/posthtml/htmlnano
    options: {}
```

## 提示

> 如果开启了代码压缩并且开启了`previewNotice`，他将在执行`hexo generate`命令时输出`Hi, hexo-minify-obfuscator!`