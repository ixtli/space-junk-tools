

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

		html: {
			files: './*.tpl.html',
			tasks: ['template']
		},

		less: {
			files: './less/*.less',
			tasks: ['less']
		},

		js: {
			files: './src/*.js',
			tasks: []
		}
	}

};
