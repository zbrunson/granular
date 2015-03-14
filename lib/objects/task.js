'use strict';

var nextId = 1;

function Task() {
	this.id = nextId;

	this.plan = null;
	this.workOrders = [];
	this.status = 'not started';

	this.product = '';
	this.targetQuantity = 0;
	this.appliedQuantity = 0;

	nextId++;
}

Task.prototype.getUnallocatedQuantity = function unallocatedQuantity() {
	var remaining = this.targetQuantity;

	this.workOrders.forEach(function(workOrder) {
		remaining -= workOrder.targetQuantity;
	});

	return remaining;
};

module.exports = Task;

