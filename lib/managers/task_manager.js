'use strict';

var path = require('path');

var Task = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'task'));
var workOrderManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'work_order_manager'));

var cache = {};

function createTask(plan) {
	var task = new Task();
	task.plan = plan;
	plan.tasks.push(task);

	cache[task.id] = task;

	return task;
}

function getTask(id) {
	return cache[id];
}

function removeTask(id, isCascade) {
	if (!(id in cache)) {
		return false;
	}

	var task = getTask(id);

	if (!isCascade) {
		var plan = task.plan;
		var idx = plan.tasks.indexOf(task); // only works because we are using the same object everywhere instead of clones
		plan.tasks.splice(idx, 1);
	}

	task.workOrders.forEach(function(workOrder) {
		workOrderManager.remove(workOrder.id, true);
	});

	delete cache[id];

	return true;
}

function listTasks() {
	return Object.keys(cache).map(function(id) {
		return getTask(id);
	});
}

exports.create = createTask;
exports.get = getTask;
exports.remove = removeTask;
exports.list = listTasks;

