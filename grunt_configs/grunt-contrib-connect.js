

/**
 * Configuration for grunt-contrib-connect
 * @type {Object}
 */
module.exports = {

	connect: {
		options: {
			port: 9000,
			hostname: 'localhost'
		},
		dev_server: {
			options: {
				livereload: true,
				base: '.'
			}
		}
	}

};
