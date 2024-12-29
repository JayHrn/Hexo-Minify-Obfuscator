<div align="right">
  Language: English
  <a title="Chinese" href="/README_CN.md">中文</a>
</div>

## hexo-minify-obfuscator

`hexo-minify-obfuscator` is a Hexo compression plugin that supports compressing HTML, CSS, and JS, as well as obfuscating JS.

- **HTML Compression**: [htmlnano](https://github.com/posthtml/htmlnano)  
- **CSS Compression**: [clean-css](https://github.com/clean-css/clean-css)  
- **JS Compression**: [terser](https://github.com/terser/terser)  
- **JS Obfuscation**: [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)  

## Install

```bash
npm install hexo-minify-obfuscator --save
```

## Explanation

> Please fill in the following configuration in the Hexo configuration file.

```yml
# hexo-minify-obfuscator default Configuration
minifyObfuscator:
  enable: true # Whether to enable code compression
  previewNotice: true # Whether to display compression notifications during local preview
  js: # Minify and obfuscate JS. It can be turned on separately, if it is turned on at the same time, it will be obfuscated first and then compressed.
    minify: # Minify JS
      enable: true
      exclude: [] # Exclude files you don't want to process，such as ['index.min.js','a.min.js']
      # Detailed configuration: https://github.com/terser/terser
      options: {}
    obfuscator: # Obfuscate JS
      enable: true
      exclude: [] # Exclude files you don't want to process
      # Detailed configuration: https://github.com/javascript-obfuscator/javascript-obfuscator
      options: {}
  css: # Minify CSS
    enable: true
    exclude: [] # Exclude files you don't want to process
    # Detailed configuration: https://github.com/clean-css/clean-css
    options: {}
  html: # Minify HTML
    enable: true
    exclude: [] # Exclude files you don't want to process
    # Detailed configuration: https://github.com/posthtml/htmlnano
    options: {}
```

## Tips

> If code compression is enabled and `previewNotice` is enabled, it will output `Hi, hexo-minify-obfuscator!` when executing the `hexo generate` command.