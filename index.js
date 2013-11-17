var Backend = require('./backend.js');
var browser = require('./detect.js');

module.exports = {
  backend: new Backend(),
  project: null,

  setup: function(project) {
    this.project = project;
    this.backend.init();
    
    return this;
  },

  report: function(err) {
    var json = JSON.stringify({
      project: this.project,
      message: err.message,
      browser: browser,
      stack: err.stack
    });

    this.backend.send(json);
  }  
};
