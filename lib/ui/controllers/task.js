'use strict';

var path = require('path');

var workOrderController = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'controllers', 'work_order'));

var taskUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'task'));
var workOrderUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'work_order'));

var structure = {
	"edit": {
		description: 'Edit this task',
		operation: taskUi.editTask
	},
	"delete work order": {
		description: 'Delete a work order (requires an id [ex. `delete work order 1`])',
		operation: workOrderUi.deleteWorkOrder
	},
	"show work order": {
		description: 'Show a work order (requires an id [ex. `show work order 1`])',
		controller: workOrderController,
		operation: workOrderUi.setWorkOrder
	},
	"add work order": {
		description: 'Add a new work order',
		controller: workOrderController,
		operation: taskUi.createWorkOrder
	}
};

function display() {
	taskUi.showTask();
}

exports.structure = structure;
exports.display = display;

