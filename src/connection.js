
define(function(require)
{

'use strict';


var RSVP = require('rsvp');


/**
 * Helper class for connection creation
 */
function Connection()
{
	var _socket = null;

	this.socket = function()
	{
		if (!arguments.length)
		{
			return _socket;
		}

		_socket = arguments[0];

		return this;
	};

	var _connectPromise = null;

	this.connectPromise = function()
	{
		if (!arguments.length)
		{
			return _connectPromise;
		}

		_connectPromise = arguments[0];

		return this;
	};

	var _messageHandler = null;

	this.messageHandler = function()
	{
		if (!arguments.length)
		{
			return _messageHandler;
		}

		_messageHandler = arguments[0];

		return this;
	};
}


Connection.prototype.isConnected = function()
{
	if (!this.socket())
	{
		return false;
	}

	return (this.socket().readyState == 1);
};


Connection.prototype.send = function(string)
{
	if (!this.isConnected())
	{
		return false;
	}

	if (!string)
	{
		return false;
	}

	this.socket().send(string);

	return true;
};


Connection.prototype.errorHandler = function(evt)
{
	var er = 'Connection error: ' + (evt.data ? evt.data : '');
	console.error(er);

	if (!this.isConnected())
	{
		this.reset();
	}
};


Connection.prototype.onMessageHandler = function(evt)
{
	if (this.messageHandler())
	{
		this.messageHandler(evt.data);
	}
};


Connection.prototype.close = function()
{
	if (!this.socket())
	{
		return this;
	}

	if (this.isConnected())
	{
		this.socket().close();
	}

	this.reset();

	return this;
};


Connection.prototype.reset = function()
{
	this.socket(null);
	this.connectPromise(null);
};


Connection.prototype.open = function(url)
{
	if (this.connectPromise())
	{
		return this;
	}

	var self = this;

	var promise = new RSVP.Promise(function(resolve, reject)
	{
		var s = new WebSocket(url);

		s.onopen = resolve;
		s.onerror = reject;
		s.onclose = reject;

		self.socket(s);
	}).then(function(result)
	{
		var s = self.socket();

		s.onerror = s.errorHandler.bind(s);
		s.onclose = s.errorHandler.bind(s);

		return RSVP.Promise.resolve(s);
	});

	this.connectPromise(promise);

	return this;
};


return Connection;


});
