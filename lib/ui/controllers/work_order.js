'use strict';

var path = require('path');

var workOrderUi = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'displays', 'work_order'));

var structure = {

};

function display() {
    workOrderUi.showWorkOrder();
}

exports.structure = structure;
exports.display = display;

