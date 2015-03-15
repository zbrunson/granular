'use strict';

exports.showCommands = function showCommands(structure) {
	console.log('Available commands [command - description]:');
	Object.keys(structure).forEach(function(key) {
		console.log(key, '-', structure[key].description);
	});
};

