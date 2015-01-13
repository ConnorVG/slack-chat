var commands = {
  _implemented: {}
};

/**
 * Handles a command.
 *
 * @param text
 */
commands.handle = function (text) {
  if (!commands.isCommand(text)) {
    return;
  }

  var input = commands.commandify(text);
  var command = this._implemented[input.command];

  if (command == null) {
    return;
  }

  return command(input.args, input.options, input.raw);
};

/**
 * Checks if a string is a command.
 *
 * @param text
 */
commands.isCommand = function (text) {
  return text.trim().charAt(0) === '!';
};

/**
 * Commandifies a string.
 *
 * @param text
 */
commands.commandify = function (text) {
  text = text.trim().substr(1);
  var command = text.split(' ')[0];

  if (text.length > command.length) {
    text = text.substr(command.length);
  } else {
    text = '';
  }

  var inputs = this.parseInputs(text);

  return {
    command: command,
    args: this.parseArgs(inputs),
    options: this.parseOptions(inputs),
    raw: text
  }
};

/**
 * Parse the inputs.
 *
 * @param text
 */
commands.parseInputs = function (text) {
  var matches = text.match(/[^ "]+|"[^"]+"/gi) || [];

  for (var i = 0; i < matches.length; i++) {
    matches[i] = matches[i].replace(/"/g,"");
  }

  return matches;
};

/**
 * Parse the args.
 *
 * @param parsable
 */
commands.parseArgs = function (parsable) {
  var args = [];
  parsable.forEach(function (value, key) {
    if (value.charAt(0) === '-') {
      return;
    }

    args.push(value);
  });

  return args;
};

/**
 * Parse the options.
 *
 * @param parsable
 */
commands.parseOptions = function (parsable) {
  var options = [];
  parsable.forEach(function (value, key) {
    if (value.length < 2 || value.charAt(0) !== '-') {
      return;
    }

    options.push(value);
  });

  return options;
};

/**
 * Implements a command.
 *
 * @param name
 * @param fn
 * @param args
 * @param flags
 */
commands.implement = function (name, fn) {
  commands._implemented[name] = fn;
};


module.exports = commands;
