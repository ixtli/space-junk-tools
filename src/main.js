
requirejs.config({

	packages: [
		{ name: 'lodash', location: '../bower_components/lodash-amd/modern' },
	],

	paths: {
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
		rsvp: '../bower_components/rsvp/rsvp.amd',
		jquery: '../jquery/dist/jquery'
	}

});

require(['core'], function(SpaceJunk)
{

	window.sj = new SpaceJunk();
	window.sj.init();

});
