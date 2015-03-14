'use strict';

var expect = require('chai').expect;
var path = require('path');

var Task = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'task'));

describe('lib/objects/task.js', function() {
	describe('structure', function() {
		var task;
		beforeEach(function() {
			task = new Task();
		});

		it('Has a reference to its plan', function() {
			expect(task.plan).to.not.be.undefined;
		});

		it('Can have multiple work orders', function() {
			expect(task.workOrders).to.be.an('array');
		});

		it('Tracks the quantity of product of product applied to a field', function() {
			expect(task.product).to.be.a('string');
			expect(task.targetQuantity).to.be.a('number');
			expect(task.appliedQuantity).to.be.a('number');
		});

		it('Has a status', function() {
			expect(task.status).to.equal('not started');
		});
	});

	describe('logic', function() {
		var task;
		beforeEach(function() {
			task = new Task();
		});

		it('getUnallocatedQuantity', function() {
			task.targetQuantity = 150;
			expect(task.getUnallocatedQuantity()).to.equal(150);

			task.workOrders.push({targetQuantity: 100});
			expect(task.getUnallocatedQuantity()).to.equal(50);
		});

		it('updateStatus', function() {
			expect(task.status).to.equal('not started');

			task.updateStatus();
			expect(task.status).to.equal('not started');

			task.workOrders.push({status: 'in progress'});
			task.workOrders.push({status: 'not started'});
			task.updateStatus();
			expect(task.status).to.equal('in progress');

			task.workOrders[1].status = 'completed';
			task.updateStatus();
			expect(task.status).to.equal('in progress');

			task.workOrders[0].status = 'completed';
			task.updateStatus();
			expect(task.status).to.equal('completed');
		});
	});
});

