var bind = require('bind');
var Backend = require('./backend.js');
var browser = require('./detect.js');

module.exports = {
  backend: new Backend(),
  project: null,
  reported: [],

  setup: function(project) {
    this.project = project;
    this.backend.init();

    window.onerror = bind(this, 'handle');

    return this;
  },

  report: function(err) {
    var json = JSON.stringify({
      project: this.project,
      message: err.message,
      browser: browser,
      stack: err.stack
    });

    this.reported.push(err);
    this.backend.send(json);
  },

  handle: function() {
    var err = arguments[4];
    if (err == null) return;

    if (this.reported.indexOf(err) < 0) {
      this.report(err);
    }
  }
};
