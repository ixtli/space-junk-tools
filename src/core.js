
define(function(require)
{

'use strict';


var $ = require('jquery');
var ace = require('ace/ace');


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

	var editor = ace.edit($('#editor')[0]);
	editor.setTheme('ace/theme/monokai');
	var session = editor.getSession();
	session.setMode('ace/mode/javascript');
	session.setUseSoftTabs(false);
	editor.setShowInvisibles(true);

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
