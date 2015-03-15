'use strict';

var path = require('path');

var workOrderController = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'controllers', 'work_order'));

var taskUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'task'));
var workOrderUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'work_order'));

var structure = {

};

function display() {
	taskUi.showTask();
}

exports.structure = structure;
exports.display = display;

