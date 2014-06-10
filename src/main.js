
require(['config'], function(config)
{
	// Configure requirejs
	requirejs.config(config);

	// Initialize the application
	require(['core'], function(SpaceJunk)
	{
		window.sj = new SpaceJunk();
		window.sj.init();
	});
});
