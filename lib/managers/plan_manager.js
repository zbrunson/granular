'use strict';

var path = require('path');

var Plan = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'plan'));
var taskManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'task_manager'));

var cache = {};

function createPlan() {
	var plan = new Plan();
	cache[plan.id] = plan;

	return plan;
}

function getPlan(id) {
	return cache[id];
}

function removePlan(id) {
	cache[id].tasks.forEach(function(task) {
		taskManager.remove(task.id, true);
	});

	delete cache[id];
}

exports.create = createPlan;
exports.get = getPlan;
exports.remove = removePlan;

