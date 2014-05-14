
define(['jquery', 'rsvp', 'lodash', 'ace'], function($, RSVP, _, ace)
{

'use strict';


/**
 * Top level object constructor
 * @constructor
 */
function SpaceJunk()
{

}

SpaceJunk.prototype.stringOfByteLength = function(len)
{
	var ret = '';
	for (var i = 0; i < len; i++)
	{
		ret += 'x';
	}
	return ret;
};


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
		socket.send(SpaceJunk.prototype.stringOfByteLength(2975));
	};

	socket.onclose = function(evt)
	{
		console.log('closed!');
	};

	socket.onmessage = function(evt)
	{
		console.log('got a message: ' + evt.data);
	};

	socket.onerror = function(evt)
	{
		console.log('error! ' + evt.data);
	};

	return true;
};


return SpaceJunk;


});
