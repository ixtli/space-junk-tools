

/**
 * Configuration for grunt-tempalte
 * @type {Object}
 */
modules.exports = {

	template: {
		index: {
			options: {
				data: {
					styles: [
						'bower_components/bootstrap/dist/css/bootstrap.css',
						'assets/style.css'
					],

					requirePath: 'bower_components/requirejs/require.js'
				}
			},

			files: {
				src: 'index.tpl.html',
				dest: 'index.html'
			}
		}
	}

};
