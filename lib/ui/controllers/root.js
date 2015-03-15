'use strict';

var path = require('path');


var planController = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'controllers', 'plan'));

var centralInventoryUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'central_inventory'));
var planUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'plan'));

var structure = {
	"show inventory": {
		description: 'Show the inventory\'s contents',
		operation: centralInventoryUi.display
	},
	"list plans": {
		description: 'Show all plans',
		operation: planUi.listPlans
	},
	"delete plan": {
		description: 'Delete a plan (requires an id [ex. `delete plan 1`])',
		operation: planUi.deletePlan
	},
	"show plan": {
		description: 'Show a plan (requires an id [ex. `show plan 1`])',
		controller: planController,
		operation: planUi.setPlan
	},
	"create plan": {
		description: 'Create a new plan',
		controller: planController,
		operation: planUi.setPlan
	}
};

function display() {
}

exports.structure = structure;
exports.display = display;

