var mongoose = require('mongoose');
var _event = require('./event');
var _location = require('./location');

module.exports = function() {
	mongoose.connect("mongodb://localhost/calendar");

	_event(mongoose);
	_location(mongoose);

	return mongoose.models;
}

