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

Task.prototype.updateStatus = function updateTaskStatus() {
	if (this.workOrders.length === 0) {
		return;
	}

	var statuses = this.workOrders.reduce(function(prev, workOrder) {
		prev.hasInProgress = prev.hasInProgress || workOrder.status === 'in progress';
		prev.allComplete = prev.allComplete && workOrder.status === 'completed';

		return prev;
	}, {
		hasInProgress: false,
		allComplete: true
	});

	if (statuses.allComplete) {
		this.status = 'completed';
	}
	else if (statuses.hasInProgress) {
		this.status = 'in progress';
	}
	else {
		this.status = 'not started';
	}
};

module.exports = Task;

