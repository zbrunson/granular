'use strict';

var nextId = 1;

function Plan() {
	this.id = nextId;
	this.name = '';
	this.tasks = [];

	nextId++;
}

module.exports = Plan;

