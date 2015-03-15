'use strict';

var path = require('path');

var planUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'plan'));

var structure = {
	"edit": {

	},
	"list tasks": {

	},
	"delete task": {

	},
	"show task": {

	},
	"add task": {

	}
};

function display() {
	planUi.showPlan();
	console.log();
}

exports.structure = structure;
exports.display = display;

