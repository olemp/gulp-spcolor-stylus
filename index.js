var through2 = require('through2');
var cheerio = require('cheerio');
var format = require("string-format");
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var Buffer = require('buffer').Buffer;
var path = require('path');

const PLUGIN_NAME = "gulp-spcolor-stylus";
module.exports = function (opt) {
  opt = opt || {};
  var doConvert = function (file) {
    var $ = cheerio.load(file.contents);
    var contents = "";
    $("[name]").each(function () {
      var name = $(this).attr("name").toString();
      var value = $(this).attr("value").toString();
      contents += format("${0} = #{1}\n", name, value);
    });
    return contents;
  };
  var throughCallback = function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }
    if (file.isBuffer()) {
      file.contents = new Buffer(doConvert(file));
    }
    this.push(file);
    return cb();
  };
  return through2.obj(throughCallback);
};
