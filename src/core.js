
define(['jquery', 'rsvp', 'lodash'], function($, RSVP, _) {

'use strict';


/**
 * Top level object constructor
 * @constructor
 */
function SpaceJunk()
{

}


/**
 * Initialization function
 * @return {boolean} true if nothing went wrong
 */
SpaceJunk.prototype.init = function()
{

	var socket = new WebSocket('ws://localhost:9038');

	socket.onopen = function(evt)
	{
		console.log('opened, sending response...');
		socket.send('Hello, world!');
	}

	socket.onclose = function(evt)
	{
		console.log('closed!');
	}

	socket.onmessage = function(evt)
	{
		console.log('got a message: ' + evt.data);
	}

	socket.onerror = function(evt)
	{
		console.log('error! ' + evt.data);
	}

	return true;
};


return SpaceJunk;


});
