'use strict';

var path = require('path');

var workOrderUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'work_order'));

var structure = {
	"edit": {
		description: 'Edit this work order',
		operation: workOrderUi.editWorkOrder
	},
	"start": {
		description: 'Start the work order',
		operation: workOrderUi.start
	},
	"complete": {
		description: 'Complete the work order',
		operation: workOrderUi.complete
	},
	"add applied quantity": {
		description: 'Add product to the amount that has been used (requires a quantity [ex. `add applied quantity 10`])',
		operation: workOrderUi.addAppliedQuantity
	},
	"set applied quantity": {
		description: 'Sets the total amount of product that has been used (requires a quantity [ex. `set applied quantity 10`])',
		operation: workOrderUi.setAppliedQuantity
	}
};

function display() {
    workOrderUi.showWorkOrder();
}

exports.structure = structure;
exports.display = display;

