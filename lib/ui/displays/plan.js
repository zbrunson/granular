'use strict';

var path = require('path');

var planManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'plan_manager'));

var displayUtils = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'util'));
var taskDisplay = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'task'));

var HEADER = 'ID | Name | Number of tasks';

function displayPlan(plan, detailed) {
	console.log(plan.id + ' | ' + plan.name + ' | ' + plan.tasks.length);

	if (detailed) {
		taskDisplay.listTasks(plan, '  ');
	}
}

function listPlans() {
	console.log(HEADER);
	planManager.list().forEach(displayPlan);
}

// storing current display plan here so that we do not have to reference the controller from the display
var currentPlan;
function setCurrentPlan(id) {
	if (!id) {
		currentPlan = planManager.create();
		return editPlan();
	}

	currentPlan = planManager.get(id);
	if (!currentPlan) {
		throw new Error('Invalid plan id: ' + id);
	}
}

function editPlan() {
	return displayUtils.getItemUpdateInputHandler(currentPlan, {
		steps: ['Name'],
		getters: {
			"Name": 'name'
		},
		setters: {
			"Name": function(plan, value) {
				plan.name = value;
			}
		}
	});
}

function deletePlan(id) {
	if (planManager.remove(id)) {
		console.log('Plan deleted');
	}
	else {
		console.log('Could not find plan to delete');
	}
}

exports.showPlan = function() {
	console.log(HEADER);
	displayPlan(currentPlan, true);
};

exports.createTask = function() {
	return taskDisplay.setTask(currentPlan);
};

exports.setPlan = setCurrentPlan;
exports.editPlan = editPlan;
exports.listPlans = listPlans;
exports.deletePlan = deletePlan;

