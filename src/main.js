
require(['config'], function(config)
{
	// Configure requirejs
	requirejs.config(config);

	// Initialize the application
	require(['core'], function(instance)
	{
		window.sj = instance;
		window.sj.init();
	});
});
