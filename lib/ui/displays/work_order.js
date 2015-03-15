'use strict';

var path = require('path');

var Task = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'task'));

var workOrderManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'work_order_manager'));

var displayUtils = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'util'));

var HEADER = 'ID | Task ID | Status | Target Quantity | Applied Quantity';

function displayWorkOrder(workOrder, indent) {
	indent = indent || '';

	console.log(indent + workOrder.id + ' | ' + workOrder.task.id + ' | ' + workOrder.status + ' | ' + workOrder.targetQuantity + ' | ' + workOrder.appliedQuantity);
}

function listWorkOrders(task, indent) {
	indent = indent || '';

	console.log(indent + HEADER);
	task.workOrders.forEach(function(workOrder) {
		displayWorkOrder(workOrder, indent);
	});
}

// storing current display work order here so that we do not have to reference the controller from the display
var currentWorkOrder;
function setCurrentWorkOrder(id) {
	if (!id) {
		throw new Error('Either a task or id need to be specified');
	}

	if (id instanceof Task) {
		currentWorkOrder = workOrderManager.create(id);
		return editWorkOrder();
	}

	currentWorkOrder = workOrderManager.get(id);
	if (!currentWorkOrder) {
		throw new Error('Invalid work order id: ' + id);
	}
}

function editWorkOrder() {
	return displayUtils.getItemUpdateInputHandler(currentWorkOrder, ['targetQuantity']);
}

function deleteWorkOrder(id) {
	if (workOrderManager.remove(id)) {
		console.log('Work order deleted');
	}
	else {
		console.log('Could not find work order to delete');
	}
}

exports.showWorkOrder = function() {
	console.log(HEADER);
	displayWorkOrder(currentWorkOrder);
};

exports.displayWorkOrder = displayWorkOrder;
exports.setWorkOrder = setCurrentWorkOrder;
exports.editWorkOrder = editWorkOrder;
exports.listWorkOrders = listWorkOrders;
exports.deleteWorkOrder = deleteWorkOrder;

