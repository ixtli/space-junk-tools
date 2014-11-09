
define(function(require)
{

'use strict';

var $ = require('jquery');

var ace = require('ace/ace');

var Connection = require('connection');

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

var _connection = null;

var _instance = new SpaceJunk();

SpaceJunk.prototype.socketURL = 'ws://localhost:9038';


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
		self.editor().clearSelection();
		$('#editor-title').html(name);
		return RSVP.Promise.resolve();
	});
};


/**
 * Initialization function
 * @return {boolean} true if nothing went wrong
 */
SpaceJunk.prototype.init = function()
{
	_connection = new Connection();

	_connection.open(this.socketURL);

	var edit = this.editor();

	edit.setTheme('ace/theme/monokai');
	edit.setShowInvisibles(true);
	edit.setHighlightActiveLine(true);
	edit.getSession().setMode('ace/mode/javascript');
	edit.getSession().setUseSoftTabs(false);
	edit.getSession().setTabSize(2);

	this.setFile('sample');

	var statusContainer = $('#editor-status');

	statusContainer.append($('<button>').html('send').on('click', function()
	{
		_connection.send(_instance.editor().getValue());
	}));

	statusContainer.append($('<button>').html('restart').on('click', function()
	{
		_connection.close();
		_connection.open(_instance.socketURL);
	}));

	return true;
};


return _instance;


});
