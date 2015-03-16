'use strict';

var path = require('path');

var workOrderUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'work_order'));

var structure = {
	"edit": {
		description: 'Edit this work order',
		operation: workOrderUi.editWorkOrder
	}
};

function display() {
    workOrderUi.showWorkOrder();
}

exports.structure = structure;
exports.display = display;

