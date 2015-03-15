'use strict';

var path = require('path');

var Plan = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'plan'));

var taskManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'task_manager'));

var displayUtils = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'util'));
var workOrderDisplay = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'work_order'));

var HEADER = 'ID | Plan ID | Status | Product | Target Quantity | Applied Quantity | Number of work orders';

function displayTask(task, detailed, indent) {
	indent = indent || '';

	console.log(indent + task.id + ' | ' + task.plan.id + ' | ' + task.status + ' | ' + task.product + ' | ' + task.targetQuantity + ' | ' + task.appliedQuantity + ' | ' + task.workOrders.length);

	if (detailed) {
		workOrderDisplay.listWorkOrders(task, indent + '  ');
	}
}

function listTasks(plan, indent) {
	indent = indent || '';

	console.log(indent + HEADER);
	plan.tasks.forEach(function(task) {
		displayTask(task, false, indent);
	});
}

// storing current display task here so that we do not have to reference the controller from the display
var currentTask;
function setCurrentTask(id) {
	if (!id) {
		throw new Error('Either plan or id need to be specified');
	}

	if (id instanceof Plan) {
		currentTask = taskManager.create(id);
		return editTask();
	}

	currentTask = taskManager.get(id);
	if (!currentTask) {
		throw new Error('Invalid task id: ' + id);
	}
}

function editTask() {
	return displayUtils.getItemUpdateInputHandler(currentTask, ['product', 'targetQuantity']);
}

function deleteTask(id) {
	if (taskManager.remove(id)) {
		console.log('Task deleted');
	}
	else {
		console.log('Could not find task to delete');
	}
}

exports.showTask = function() {
	console.log(HEADER);
	displayTask(currentTask, true);
};

exports.createWorkOrder = function() {
	return workOrderDisplay.setWorkOrder(currentTask);
};

exports.displayTask = displayTask;
exports.setTask = setCurrentTask;
exports.editTask = editTask;
exports.listTasks = listTasks;
exports.deleteTask = deleteTask;

