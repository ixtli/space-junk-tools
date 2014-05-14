/* jshint strict: false, undef: false, camelcase: false, scripturl: false */


/**
 * Top level grunt configuration
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
module.exports = function(grunt)
{
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-http');

	var _ = require('lodash');

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
		var files = grunt.file.expand('./grunt_configs/*.js');
		var count = files.length;
		for (var i = 0; i < count; i++)
		{
			_.assign(fullConfig, require(files[i]));
		}

		return fullConfig;
	};

	var taskConfig = processConfigurationFiles();

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
		// 'build',
		'connect:dev_server',
		'delta'
	]);

	grunt.registerTask('default', ['watch']);
};
