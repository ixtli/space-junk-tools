
define(function(require)
{

'use strict';

var $ = require('jquery');

var ace = require('ace/ace');

var RSVP = require('rsvp');

/**
 * Top level object constructor
 * @constructor
 */
function SpaceJunk()
{
	var _editor = ace.edit('editor');

	this.editor = function()
	{
		return _editor;
	};
}


SpaceJunk.prototype.setFile = function(name)
{
	var self = this;

	return new RSVP.Promise(function(resolve, reject)
	{
		$.ajax({
			url: 'src/' + name + '.js',
			dataType: 'text',
			error: reject,
			success: resolve,
			cache: false
		});
	}).then(function(result)
	{
		self.editor().setValue(result);
		$('#editor-title').html(name);
		return RSVP.Promise.resolve();
	});
};


SpaceJunk.prototype.sendValue


/**
 * Initialization function
 * @return {boolean} true if nothing went wrong
 */
SpaceJunk.prototype.init = function()
{
	var url = 'ws://localhost:9038';

	var socket = new WebSocket(url);

	socket.onopen = function(evt)
	{
		console.log('opened!');
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

	var edit = this.editor();

	edit.setTheme('ace/theme/monokai');
	edit.getSession().setMode('ace/mode/javascript');

	this.setFile('sample');

	var statusContainer = $('#editor-status');

	statusContainer.append($('<button>').html('send').on('click', function()
	{
		var val = edit.getValue();

		if (val)
		{
			socket.send(val);
		} else {
			console.warn('Not sending empty val.');
		}

	}));

	statusContainer.append($('<button>').html('restart').on('click', function()
	{
		socket.close();
		socket = new WebSocket(url);

		socket.onerror = function(evt)
		{
			console.error(evt);
			console.log(evt.data);
		};
	}));

	return true;
};


return SpaceJunk;


});
