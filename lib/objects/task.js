'use strict';

var nextId = 1;

function Task() {
	this.id = nextId;

	this.plan = -1;
	this.workOrders = [];
	this.status = 'not started';

	this.product = '';
	this.targetQuantity = 0;
	this.appliedQuantity = 0;

	nextId++;
}

module.exports = Task;

