'use strict';

var path = require('path');

var input = require(path.join(process.env.PROJECT_ROOT, 'lib', 'input'));
var uiRoot = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'controllers', 'root'));

var displayUtils = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'util'));

var uiStack = [uiRoot];

var applicationStructure = {
	"top": {
		operation: function() {
			uiStack = [uiRoot];
		}
	},
	"up": {
		operation: function() {
			uiStack.splice(uiStack.length - 1, 1);
		}
	}
};

function displayNavigation() {
	if (uiStack.length <= 1) {
		return;
	}

	console.log('Navigation:');
	console.log('  top: go to the top menu');
	if (uiStack.length > 1) {
		console.log('  up: go up one menu level');
	}
	console.log();
}

function handleOperation(cmd, key, option) {
	var nextHandler;
	try {
		if (option.operation) {
			nextHandler = option.operation(cmd.substring(key.length).trim());
		}

		if (option.controller) {
			uiStack.push(option.controller);
		}
	}
	catch (e) {
		console.log(e);
		console.log();
	}

	return nextHandler;
}

function handleCmd(cmd) {
	cmd = cmd.toLowerCase();

	var cmds = Object.keys(applicationStructure);
	for (var i = 0; i < cmds.length; i++) {
		if (cmd.match('^' + cmds[i])) {
			return handleOperation(cmd, cmds[i], applicationStructure[cmds[i]]);
		}
	}

	var options = uiStack[uiStack.length - 1].structure;
	cmds = Object.keys(options);
	for(i = 0; i < cmds.length; i++) {
		if (cmd.match('^' + cmds[i])) {
			return handleOperation(cmd, cmds[i], options[cmds[i]]);
		}
	}

	console.log('Command not found');
}

handleCmd.display = function() {
	uiStack[uiStack.length - 1].display();

	displayNavigation();
	displayUtils.showCommands(uiStack[uiStack.length - 1].structure);

	console.log();
};

var currentCmdHandler;
function handleInput(cmd) {
	currentCmdHandler = currentCmdHandler(cmd);
	currentCmdHandler = currentCmdHandler || handleCmd;
	currentCmdHandler.display();
}

exports.initialize = function uiInit() {
	currentCmdHandler = handleCmd;
	handleCmd.display();
	input.setHandler(handleInput);
};

