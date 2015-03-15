'use strict';

var expect = require('chai').expect;
var path = require('path');

var Plan = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'plan'));
var planManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'plan_manager'));
var taskManager = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'task_manager'));

describe('lib/managers/plan_manager.js', function() {
	var plan;
	beforeEach(function() {
		plan = planManager.create();
	});

	it('Can create plans', function() {
		expect(plan).to.be.an.instanceof(Plan);
	});

	it('Can recall plans', function() {
		expect(planManager.get(plan.id)).to.equal(plan);
	});

	it('Can delete plans', function() {
		var id = plan.id;

		expect(planManager.remove(null)).to.be.false;

		var task = taskManager.create(plan);

		expect(taskManager.get(task.id)).to.not.be.undefined;
		expect(planManager.get(id)).to.be.an.instanceof(Plan);

		expect(planManager.remove(id)).to.be.true;

		expect(planManager.get(id)).to.be.undefined;
		expect(taskManager.get(task.id)).to.be.undefined;
	});

	it('Can list plans', function() {
		var plans = planManager.list();

		expect(plans).to.be.an.instanceof(Array);
		plans.forEach(function(p) {
			expect(p).to.be.an.instanceof(Plan);
		});
	});
});

