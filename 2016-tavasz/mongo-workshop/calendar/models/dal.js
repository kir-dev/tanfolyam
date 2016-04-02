var mongoose = require('mongoose');
var _event = require('./event');
var _location = require('./location');
var _user = require('./user');

module.exports = function() {
	mongoose.connect("mongodb://localhost/calendar");

	_event(mongoose);
	_location(mongoose);
	_user(mongoose);

	return mongoose.models;
}

