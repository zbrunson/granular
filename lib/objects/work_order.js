'use strict';

var path = require('path');

var centralInventory = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'central_inventory'));

var nextId = 1;

function WorkOrder() {
	this.id = nextId;

	this.task = null;
	this.status = 'not started';

	this.targetQuantity = 0;
	this.appliedQuantity = 0;

	nextId++;
}

WorkOrder.prototype.setTargetQuantity = function setTargetQuantity(amount) {
	var amountLeft = this.task.getUnallocatedQuantity();
	if (amountLeft < amount) {
		throw new Error('Task does not have enough unallocated product for this quantity, requested: ' + amount + ' amount left: ' + amountLeft);
	}

	this.targetQuantity = amount;
};

WorkOrder.prototype.addAppliedQuantity = function addAppliedQuantity(amount) {
	if (!centralInventory.hasInventory(this.task.product, amount)) {
		throw new Error('Not enough inventory left for this product, product: ' +
			this.task.product + ' requested amount: ' + amount + ' remaining amount: ' + centralInventory.getContents()[this.task.product]);
	}

	centralInventory.useProduct(this.task.product, amount);
	this.task.appliedQuantity += amount;
	this.appliedQuantity += amount;
};

WorkOrder.prototype.setAppliedQuantity = function setAppliedQuantity(amount) {
	if (!centralInventory.hasInventory(this.task.product, amount - this.appliedQuantity)) {
		throw new Error('Not enough inventory left for this product, product: ' +
			this.task.product + ' requested amount: ' + amount + ' remaining amount: ' +
			(centralInventory.getContents()[this.task.product] + this.appliedQuantity));
	}

	centralInventory.useProduct(this.task.product, amount - this.appliedQuantity);
	this.task.appliedQuantity += amount - this.appliedQuantity;
	this.appliedQuantity = amount;
};

WorkOrder.prototype.start = function startWorkOrder() {
	if (!centralInventory.hasInventory(this.task.product, this.targetQuantity)) {
		throw new Error('Not enough inventory to start this work order, product: ' +
			this.task.product + ' required amount: ' + this.targetQuantity + ' remaining amount: ' +
			centralInventory.getContents()[this.task.product]);
	}

	this.status = 'in progress';
	this.task.updateStatus();
};

WorkOrder.prototype.complete = function complete() {
	this.status = 'completed';
	this.task.updateStatus();
};

module.exports = WorkOrder;

