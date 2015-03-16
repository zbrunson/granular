'use strict';

var path = require('path');

var taskController = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'controllers', 'task'));

var planUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'plan'));
var taskUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'task'));

var structure = {
	"edit": {
		description: 'Edit this plan',
		operation: planUi.editPlan
	},
	"delete task": {
		description: 'Delete a task (requires an id [ex. `delete task 1`])',
		operation: taskUi.deleteTask
	},
	"show task": {
		description: 'Show a task (requires an id [ex. `show task 1`])',
		controller: taskController,
		operation: taskUi.setTask
	},
	"add task": {
		description: 'Create a new task',
		controller: taskController,
		operation: planUi.createTask
	},
	"usage": {
		description: 'Compare the planned vs. actuals for the plan',
		operation: planUi.usageReport
	}
};

function display() {
	planUi.showPlan();
}

exports.structure = structure;
exports.display = display;

