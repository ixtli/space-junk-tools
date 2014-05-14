

/**
 * Configuration for grunt-contrib-less plugin
 * @type {Object}
 */
module.exports = {

	less: {
		build: {
			options: {
				paths: ['./less/*.less']
			},
			src: './less/*.less',
			dest: './assets/style.css'
		}
	}

};
