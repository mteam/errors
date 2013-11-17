var bind = require('bind');

function Backend() {
  this.loaded = false;
  this.queue = [];
  this.frame = null;
}

Backend.url = 'http://errors.marshmallowteam.com/report/frame';

Backend.prototype.init = function() {
  this.frame = document.createElement('iframe');
  this.frame.onload = bind(this, 'onLoad');
  this.frame.src = Backend.url;

  this.frame.style.display = 'none';
  document.body.appendChild(this.frame);
};

Backend.prototype.send = function(data) {
  if (this.loaded) {
    this.postMessage(data);
  } else {
    this.queue.push(data);
  }
};

Backend.prototype.postMessage = function(data) {
  var window = this.frame.contentWindow;
  window.postMessage(data, '*');
};

Backend.prototype.onLoad = function() {
  for (var i = 0; i < this.queue.length; i++) {
    this.postMessage(this.queue[i]);
  }

  this.loaded = true;
};

module.exports = Backend;
