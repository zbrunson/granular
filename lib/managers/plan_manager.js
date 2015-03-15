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
	if (!(id in cache)) {
		return false;
	}

	cache[id].tasks.forEach(function(task) {
		taskManager.remove(task.id, true);
	});

	delete cache[id];

	return true;
}

function listPlans() {
	return Object.keys(cache).map(function(id) {
		return getPlan(id);
	});
}

exports.create = createPlan;
exports.get = getPlan;
exports.remove = removePlan;
exports.list = listPlans;

