var EventEmitter = require('events').EventEmitter;
var slack = require('./slack');
var ws = require('ws');


/**
 * The Server constructor.
 *
 * @param port
 */
var Server = function (port) {
  this.id = process.getgid && process.getgid() || this.port;
  this.port = port;
};

/**
 * Extend the EventEmitter class's prototype.
 *
 * @type {Object|Function|EventEmitter|*}
 * @private
 */
Server.prototype.__proto__ = EventEmitter.prototype;

/**
 * Starts the server listening.
 */
Server.prototype.listen = function () {
  slack.call('rtm.start', {}, this.setup.bind(this));

  this.on('respond.message', this.send.bind(this));
};

/**
 * Sets up from a response.
 *
 * @param response
 */
Server.prototype.setup = function (response) {
  if (!response.ok) {
    return;
  }

  this.ws = new ws(response.body.url, {
    port: this.port
  });

  var emitter = this;

  this.ws.on('open', function () {
    emitter.emit('listening');
  });

  this.ws.on('close', function () {
    emitter.emit('close');
  });

  this.ws.on('message', this.onMessage.bind(this));
};

/**
 * Handles a message.
 *
 * @param data
 * @param flags
 */
Server.prototype.onMessage = function (data, flags) {
  data = JSON.parse(data);

  this.emit('slack.' + data.type, data, flags);
};

/**
 * Sends a message response.
 *
 * @param type
 * @param data
 */
Server.prototype.send = function (type, data) {
  data.text = data.text.replace('%channel%', '<@' + data.channel + '>');

  if (data.user != null) {
    data.text = data.text.replace('%user%', '<@' + data.user + '>');
  }

  this.ws.send(JSON.stringify({
    id: this.id,
    type: 'message',
    channel: data.channel,
    text: data.text
  }));
};


module.exports = Server;
