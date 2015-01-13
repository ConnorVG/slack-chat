/**
 * Handles the echo command.
 *
 * @param args
 * @param options
 * @param raw
 * @returns {*}
 */
var handle = function (args, options, raw) {
  return raw;
};

/**
 * Sets up the echo command.
 *
 * @usage echo [text to echo]
 * @param commands
 */
var setup = function (commands) {
  commands.implement('echo', handle);
};


module.exports = setup;
