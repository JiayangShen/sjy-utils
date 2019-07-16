This directory is for third party coponents and libraries that not imported from npm.

### es6-polyfill

https://github.com/zloirock/core-js

使用 core-js 自定义构建生成，构建命令：

```
npm run grunt build:es6.array.fill,es6.array.find,es6.array.find-index,es6.string.includes,es6.string.starts-with,es6.string.ends-with,es6.promise -- --blacklist=es5 --library=off --path=custom uglify
```
