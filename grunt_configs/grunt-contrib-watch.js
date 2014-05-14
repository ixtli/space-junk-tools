

/**
 * Configuration for grunt-contrib-watch plugin
 * @type {Object}
 */
module.exports = {

	delta: {
		/**
		 * By default, we want the Live Reload to work for all tasks; this is
		 * overridden in some tasks (like this file) where browser resources are
		 * unaffected. It runs by default on port 35729, which your browser
		 * plugin should auto-detect.
		 */
		options: {
			livereload: true
		},

		/**
		 * When the Gruntfile changes, we just want to lint it. In fact, when
		 * your Gruntfile changes, it will automatically be reloaded!
		 */
		gruntfile: {
			files: 'Gruntfile.js',
			tasks: ['jshint:gruntfile'],
			options: {
				livereload: false
			}
		}
	}

};
