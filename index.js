var bind = require('bind');
var Backend = require('./backend.js');
var browser = require('./detect.js');

module.exports = {
  backend: new Backend(),
  project: null,
  reported: false,

  setup: function(project) {
    this.project = project;
    this.backend.init();

    window.onerror = bind(this, 'handle');

    return this;
  },

  report: function(err, rethrown) {
    if (rethrown == null) rethrown = true;

    this.send(err.message, err.stack);
    this.reported = rethrown;
  },

  handle: function(message, url, line, column, error) {
    if (this.reported) {
      this.reported = false;
      return;
    }

    var stack = error
      ? error.stack
      : url + ':' + line;

    this.send(message, stack);
  },

  send: function(message, stack) {
    var json = JSON.stringify({
      project: this.project,
      message: message,
      browser: browser,
      stack: stack
    });

    this.backend.send(json);
  }
};
