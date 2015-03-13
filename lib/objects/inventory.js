'use strict';

var nextId = 1;

function Inventory(initialContents) {
	this.id = nextId;

	this.contents = {};
	if (initialContents) {
		var that = this;
		Object.keys(initialContents).forEach(function(item) {
			that.contents[item] = initialContents[item];
		});
	}

	nextId++;
}

module.exports = Inventory;

