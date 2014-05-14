
requirejs.config({

	packages: [
		{ name: 'lodash', location: '../bower_components/lodash-amd/modern' },
		{ name: 'ace', location: '../bower_components/ace/lib/ace', main: 'ace' }
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
