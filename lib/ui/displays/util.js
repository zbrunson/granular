'use strict';

exports.showCommands = function showCommands(structure) {
	console.log('Available commands [command - description]:');
	Object.keys(structure).forEach(function(key) {
		console.log(key, '-', structure[key].description);
	});
};

exports.getItemUpdateInputHandler = function(item, options) {
	var currentStep = 0;
	var steps = options.steps;

	function inputHandler(input) {
		try {
			if (input.length > 0) {
				options.setters[steps[currentStep]](item, input);
			}

			currentStep++;
			if (currentStep === steps.length) {
				return;
			}
		}
		catch (e) {
			console.log(e);
		}

		return inputHandler;
	}

	inputHandler.display = function() {
		console.log(steps[currentStep], '(' + item[options.getters[steps[currentStep]]] + '):');
	};

	return inputHandler;
};

