'use strict';

exports.copy = function(obj) {
	var ret = {};

	Object.keys(obj).forEach(function(key) {
		ret[key] = obj[key];
	});

	return ret;
};

exports.restore = function(original, obj) {
	Object.keys(obj).forEach(function(key) {
		delete obj[key];
	});

	Object.keys(original).forEach(function(key) {
		obj[key] = original[key];
	});
};

