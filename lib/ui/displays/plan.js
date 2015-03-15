'use strict';

var path = require('path');

var planManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'plan_manager'));

function displayPlan(plan, detailed) {
	console.log(plan.id, '|', plan.name, '|', plan.tasks.length);

	if (detailed) {
		// TODO - display task
	}
}

function listPlans() {
	console.log('ID | Name | Number of tasks');
	planManager.list().forEach(displayPlan);
	console.log();
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
	var steps = ['name'];
	var currentStep = 0;

	/**
	 * Input handler that returns the next input handler
	 */
	function inputHandler(input) {
		if (currentStep >= 0 && input.length > 0) {
			currentPlan[steps[currentStep]] = input;
		}

		currentStep++;
		if (currentStep === steps.length) {
			return;
		}

		return inputHandler;
	}

	inputHandler.display = function() {
		console.log(steps[currentStep], '(' + currentPlan[steps[currentStep]] + '):');
	};

	return inputHandler;
}

function deletePlan(id) {
	if (planManager.remove(id)) {
		console.log('Plan deleted');
	}
	else {
		console.log('Could not find plan to delete');
	}

	console.log();
}

exports.showPlan = function() {
	displayPlan(currentPlan, true);
};

exports.setPlan = setCurrentPlan;
exports.editPlan = editPlan;
exports.listPlans = listPlans;
exports.deletePlan = deletePlan;

