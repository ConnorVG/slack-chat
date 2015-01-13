var Server = require('./server');


var app = {
  _meta: {}
};

/**
 * Sets a meta value
 *
 * @param key
 * @param value
 */
app.set = function (key, value) {
  app._meta[key] = value;
};

/**
 * Gets a meta value.
 *
 * @param key
 * @param _default
 * @returns {*}
 */
app.get = function (key, _default) {
  var value = app._meta[key];

  if (value === undefined) {
    return _default;
  }

  return value;
};

/**
 * Creates a server instance.
 */
app.createServer = function () {
  return new Server(app.get('port', 3000));
};


module.exports = app;
