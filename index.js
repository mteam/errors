var browser = require('./detect.js');

var self = {
  frame: document.createElement('iframe'),
  project: null,
  loaded: false
  queue: [],
};

self.send = function(json) {
  var window = self.frame.contentWindow;
  window.postMessage(json, '*');
};

self.setup = function(project) {
  self.project = project;

  self.frame.addEventListener('load', self.flush, false);
  self.frame.src = 'http://errors.marshmallowteam.com/report/frame';
  self.frame.style.display = 'none';

  document.body.appendChild(self.frame);
};

self.flush = function() {
  self.loaded = true;

  for (var i = 0; i < self.queue.length; i++) {
    self.send(self.queue[i]);
  }
};

self.report = function(err) {
  var json = JSON.stringify({
    project: self.project,
    message: err.message,
    browser: browser,
    stack: err.stack
  });

  if (self.loaded) {
    self.send(json);
  } else {
    self.queue.push(json);
  }
};

exports.setup = self.setup;
exports.report = self.report;
