'use strict';

var path = require('path');

var WorkOrder = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'work_order'));

var cache = {};

function createWorkOrder(task) {
	var workOrder = new WorkOrder();
	workOrder.task = task;
	task.workOrders.push(workOrder);

	cache[workOrder.id] = workOrder;

	return workOrder;
}

function getWorkOrder(id) {
	return cache[id];
}

function removeWorkOrder(id, isCascade) {
	if (!(id in cache)) {
		return false;
	}

	if (!isCascade) {
		var workOrder = getWorkOrder(id);
		var task = workOrder.task;
		var idx = task.workOrders.indexOf(workOrder); // only works because we are using the same object everywhere instead of clones
		task.workOrders.splice(idx, 1);
	}

	delete cache[id];

	return true;
}

function listWorkOrders() {
	return Object.keys(cache).map(function(id) {
		return getWorkOrder(id);
	});
}

exports.create = createWorkOrder;
exports.get = getWorkOrder;
exports.remove = removeWorkOrder;
exports.list = listWorkOrders;

