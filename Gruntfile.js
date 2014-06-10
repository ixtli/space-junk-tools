/* jshint strict: false, undef: false, camelcase: false, scripturl: false */


/**
 * Top level grunt configuration
 * @param  {Grunt} grunt the top level grunt object provided by the lib
 */
module.exports = function(grunt)
{
	// This is sometimes useful.
	var pkg = grunt.file.readJSON('package.json');

	// Get the list of grunt modules from package.json's devDeps.
	var modules = Object.keys(pkg.devDependencies);
	var moduleCount = modules.length;

	// Load plugins listed in exports
	modules.forEach(grunt.loadNpmTasks, grunt);

	// As of recent versions of grunt, you require this just like anything else
	var _ = require('lodash');

	// Directory that contains devDependency task configurations
	var configBasePath = './grunt_configs/';

	/**
	 * Itterate through all files in the grunt_configs directory, read them
	 * and load them into a master blob and return them. This is a little
	 * mechanism that releaves the need to jam all configuration in this file.
	 * @return {Object} The final, assembled task config
	 */
	var processConfigurationFiles = function()
	{
		var ret = {};

		for (var i = 0; i < moduleCount; i++)
		{
			_.assign(ret, require(configBasePath + modules[i] + '.js'));
		}

		return ret;
	};

	// The master task configuration
	var taskConfig = processConfigurationFiles();

	// Initialize grunt
	grunt.initConfig(_.assign(taskConfig, pkg));

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

	// The big build task
	grunt.registerTask('build', [
		'less',
		'template:index'
	]);

	// Seems to be the convention
	grunt.registerTask('default', ['watch']);
};
