/**
 * Static for speed.
 * *
 * @type {{master: string[], 4.2: string[]}}
 */
var sections = {
  'master': [
    'artisan', 'authentication', 'billing', 'cache', 'commands', 'configuration', 'container', 'contracts', 'contributing', 'contributions', 'controllers',
    'database', 'documentation', 'eloquent', 'errors', 'events', 'extending', 'facades', 'helpers', 'homestead', 'html', 'installation',
    'introduction', 'license', 'lifecycle', 'localization', 'mail', 'middleware', 'migrations', 'packages', 'pagination', 'providers', 'queries',
    'queues', 'readme', 'redis', 'releases', 'requests', 'responses', 'routing', 'schema', 'session', 'ssh', 'structure',
    'templates', 'testing', 'upgrade', 'validation', 'views'
  ],
  '4.2': [
    'artisan', 'billing', 'cache', 'commands', 'configuration', 'contributing', 'contributions', 'controllers', 'database', 'eloquent', 'errors',
    'events', 'extending', 'facades', 'helpers', 'homestead', 'html', 'installation', 'introduction', 'ioc', 'license', 'lifecycle',
    'localization', 'mail', 'migrations', 'packages', 'pagination', 'queries', 'queues', 'quick', 'redis', 'releases', 'requests',
    'responses', 'routing', 'schema', 'security', 'session', 'ssh', 'templates', 'testing', 'upgrade', 'validation'
  ]
};

/**
 * Gets the output for the inputs.
 *
 * @param _version
 * @param _section
 */
var getOutput = function (_version, _section) {
  var version = sections[_version];
  if (version == null) {
    return '%user%\r\n> Unknown version `' + _version + '`, try `master` or `4.2`';
  }

  var section = version.indexOf(_section) !== -1;
  if (!section) {
    return '%user%\r\n> Unknown section `' + _section + '`, try `introduction` or `artisan`';
  }

  return '%user%\r\n> http://laravel.com/docs/' + _version + '/' + _section;
};

/**
 * Handles the docs command.
 *
 * @param args
 * @param options
 * @param raw
 * @returns {*}
 */
var handle = function (args, options, raw) {
  if (args.length < 2) {
    return '%user%\r\n> Wrong syntax, please use `/docs <version> <section>`';
  }

  return getOutput(args[0].toLowerCase(), args[1].toLowerCase());
};

/**
 * Sets up the docs command.
 *
 * @usage docs <version> <section>
 * @param commands
 */
var setup = function (commands) {
  commands.implement('doc', handle);
  commands.implement('docs', handle);
  commands.implement('documentation', handle);
};


module.exports = setup;
