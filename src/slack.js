var https = require('https');
var querystring = require('querystring');
var config = require('./config').slack;


var slack = {
  host: 'slack.com',
  apiPath: '/api/',
  user: config.user,
  token: config.token
};

/**
 * Calls a method with the given parameters.
 *
 * @param method
 * @param params
 * @param callback
 */
slack.call = function (method, params, callback) {
  params = params || {};
  params.token = slack.token;

  var body = querystring.stringify(params);

  var request = https.request({
    host: slack.host,
    path: slack.path(method),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length
    }
  });

  request.on('error', function (error) {
    var response = {
      ok: false,
      api: false,
      error: error.errno
    };

    if (callback != null) {
      return callback(response);
    }

    return response;
  });

  request.on('response', function (response) {
    var buffer = '';

    response.on('data', function (chunk) {
      buffer += chunk;
    });

    response.on('end', function () {
      var _response = {
        ok: response.statusCode === 200,
        api: true,
        statusCode: response.statusCode
      };

      if (_response.ok) {
        _response.body = JSON.parse(buffer);
      }

      if (callback) {
        return callback(_response);
      }

      return _response;
    });
  });

  request.write(body);
  return request.end();
};

/**
 * Quickly builds an api path.
 *
 * @param method
 * @returns {string}
 */
slack.path = function (method) {
  return slack.apiPath + method;
};


module.exports = slack;
