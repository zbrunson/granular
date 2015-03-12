'use strict';

var nextId = 1;

function Inventory() {
	this.id = nextId;

	this.contents = {};

	nextId++;
}

module.exports = Inventory;

