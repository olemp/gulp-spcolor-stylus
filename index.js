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
    var output = "";
    $("[name]").each(function () {
      var name = $(this).attr("name").toString();
      var hex = $(this).attr("value").toString();
      var hasAlpha = (hex.length === 8);
      if (hasAlpha) {
        var alpha = (parseInt(hex.substr(6, 2), 16) / 255).toFixed(2);
        hex = hex.substr(0, 6);
        output += format("${0} = rgba(#{1}, {2})\n", name, hex, alpha);
      } else {
        output += format("${0} = #{1}\n", name, hex);
      }
    });
    return output;
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