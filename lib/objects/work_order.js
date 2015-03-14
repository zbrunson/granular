'use strict';

var nextId = 1;

function WorkOrder() {
	this.id = nextId;

	this.task = null;
	this.status = 'not started';

	this.product = '';
	this.targetQuantity = 0;
	this.appliedQuantity = 0;

	nextId++;
}

module.exports = WorkOrder;

