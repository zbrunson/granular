'use strict';

var expect = require('chai').expect;
var path = require('path');

var Task = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'task'));

var planManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'plan_manager'));
var taskManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'task_manager'));
var workOrderManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'work_order_manager'));

describe('lib/managers/task_manager.js', function() {
	var plan;
	before(function() {
		plan = planManager.create();
	});

	var task;
	beforeEach(function() {
		task = taskManager.create(plan);
	});

	it('Can create tasks', function() {
		expect(task).to.be.an.instanceof(Task);
		expect(task.plan).to.equal(plan);
	});

	it('Can recall tasks', function() {
		expect(taskManager.get(task.id)).to.equal(task);
	});

	it('Can delete tasks', function() {
		expect(taskManager.remove(null)).to.be.false;

		var workOrder = workOrderManager.create(task);

		expect(workOrderManager.get(workOrder.id)).to.not.be.undefined;
		expect(plan.tasks.indexOf(task)).to.be.at.least(0);
		expect(taskManager.get(task.id)).to.be.an.instanceof(Task);

		expect(taskManager.remove(task.id)).to.be.true;

		expect(plan.tasks.indexOf(task)).to.equal(-1);
		expect(taskManager.get(task.id)).to.be.undefined;
		expect(workOrderManager.get(workOrder.id)).to.be.undefined;
	});

	it('Can list tasks', function() {
		var tasks = taskManager.list();

		expect(tasks).to.be.an.instanceof(Array);
		tasks.forEach(function(t) {
			expect(t).to.be.an.instanceof(Task);
		});
	});
});

