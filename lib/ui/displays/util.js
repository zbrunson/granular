'use strict';

exports.showCommands = function showCommands(structure) {
	console.log('Available commands [command - description]:');
	Object.keys(structure).forEach(function(key) {
		console.log(key, '-', structure[key].description);
	});
};

exports.getItemUpdateInputHandler = function(item, steps) {
	var currentStep = 0;

	function inputHandler(input) {
		if (input.length > 0) {
			item[steps[currentStep]] = input;
		}

		currentStep++;
		if (currentStep === steps.length) {
			return;
		}

		return inputHandler;
	}

	inputHandler.display = function() {
		console.log(steps[currentStep], '(' + item[steps[currentStep]] + '):');
	};

	return inputHandler;
};

