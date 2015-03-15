'use strict';

var path = require('path');

var inventory = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'central_inventory'));

exports.display = function displayInventory() {
	var contents = inventory.getContents();

	console.log('Inventory contents:');
	Object.keys(contents).forEach(function(item) {
		console.log(' ', item, '-', contents[item]);
	});
};

