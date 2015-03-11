'use strict';

var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.setPrompt('> ');

// handle the input
rl.on('line', function(cmd) {
	if (!started) {
		return;
	}
	
	rl.pause();
	
	if (inputHandler) {
		inputHandler(cmd);
	}
	
	rl.prompt();
});

// watch for escape key
process.stdin.on('data', function(key) {
	if (key[0] === 27) {
		process.exit(0);
	}
});

var inputHandler;
exports.setHandler = function setInputHandler(handler) {
	inputHandler = handler;
};

var started = false;
exports.start = function startInput() {
	if (!started) {
		rl.prompt();
		started = true;
	}
};

