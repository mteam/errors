var tests = {
  'Chrome': /Chrome\/(\d+)/,
  'Firefox': /Firefox\/([0-9.]+)/,
  'IE': /MSIE ([0-9.]+)/,
  'Opera': /Opera\/([0-9.]+)/,
  'iOS Safari': /(?:iPad|iPhone).+Version\/([0-9.]+)/
};

var browser = (function(ua){

  for (var name in tests) {
    var regex = tests[name];
    var result = regex.exec(ua);

    if (result) {
      return name + ' ' + result[1];
    }
  }

})(navigator.userAgent);

module.exports = browser || 'unknown';
