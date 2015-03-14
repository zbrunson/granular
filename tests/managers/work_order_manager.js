'use strict';

var expect = require('chai').expect;
var path = require('path');

var WorkOrder = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'work_order'));

var planManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'plan_manager'));
var taskManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'task_manager'));
var workOrderManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'work_order_manager'));

describe('lib/managers/work_order_manager.js', function() {
	var plan;
	var task;
	before(function() {
		plan = planManager.create();
		task = taskManager.create(plan);
	});

	var workOrder;
	beforeEach(function() {
		workOrder = workOrderManager.create(task);
	});

	it('Can create work orders', function() {
		expect(workOrder).to.be.an.instanceof(WorkOrder);
		expect(workOrder.task).to.equal(task);
	});

	it('Can recall work orders', function() {
		expect(workOrderManager.get(workOrder.id)).to.equal(workOrder);
	});

	it('Can delete work orders', function() {
		expect(task.workOrders.indexOf(workOrder)).to.be.at.least(0);
		expect(workOrderManager.get(workOrder.id)).to.be.an.instanceof(WorkOrder);
		workOrderManager.remove(workOrder.id);

		expect(workOrderManager.get(workOrder.id)).to.be.undefined;
		expect(task.workOrders.indexOf(workOrder)).to.equal(-1);
	});
});

