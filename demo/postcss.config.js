var importer = require('postcss-import');
var cssnext = require('postcss-cssnext');

module.exports = function(){
  return  {
    plugins: [
      importer({path: ["./src/css"]}),
      cssnext
    ]
  }
}
















