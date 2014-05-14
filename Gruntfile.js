/* jshint strict: false, undef: false, camelcase: false, scripturl: false */


/**
 * Top level grunt configuration
 * @param  {Grunt} grunt the top level grunt object provided by the lib
 */
module.exports = function(grunt)
{
	// List of active modules, to be loaded. Comment them out to remove.
	var moduleNames = [
		'grunt-contrib-watch',
		'grunt-contrib-less',
		'grunt-contrib-connect',
		'grunt-template'
	];

	var moduleCount = moduleNames.length;

	// Load plugins listed in exports
	moduleNames.forEach(grunt.loadNpmTasks, grunt);

	// As of recent versions of grunt, you require this just like anything else
	var _ = require('lodash');

	// This is sometimes useful.
	var pkg = grunt.file.readJSON('package.json');

	/**
	 * Itterate through all files in the grunt_configs directory, read them
	 * and load them into a master blob and return them. This is a little
	 * mechanism that releaves the need to jam all configuration in this file.
	 * @return {Object} The final, assembled task config
	 */
	var processConfigurationFiles = function()
	{
		var fullConfig = {};
		var basePath = './grunt_configs/';
		for (var i = 0; i < moduleCount; i++)
		{
			_.assign(fullConfig, require(basePath + moduleNames[i] + '.js'));
		}

		return fullConfig;
	};

	// The master task configuration
	var taskConfig = processConfigurationFiles();

	// Initialize grunt
	grunt.initConfig(_.assign(taskConfig, pkg));

	/**
	 * Register the config loading as a separate task
	 */
	grunt.registerTask('reloadConfigs', 'reload config files', function(env)
	{
		var path = './grunt_configs/' + env;
		grunt.config.init(require(path));
	});

	/**
	 * In order to make it safe to just compile or copy *only* what was changed,
	 * we need to ensure we are starting from a clean, fresh build. So we rename
	 * the `watch` task to `delta` (that's why the configuration var above is
	 * `delta`) and then add a new task called `watch` that does a clean build
	 * before watching for changes.
	 */
	grunt.renameTask('watch', 'delta');
	grunt.registerTask('watch', [
		'build',
		'connect:dev_server',
		'delta'
	]);

	/**
	 * The big build task
	 */
	grunt.registerTask('build', [
		'less',
		'template:index'
	]);

	grunt.registerTask('default', ['watch']);
};
