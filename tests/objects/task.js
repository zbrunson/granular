'use strict';

var expect = require('chai').expect;
var path = require('path');

var Task = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'task'));

describe('lib/objects/task.js', function() {
	describe('structure', function() {
		var task;
		before(function() {
			task = new Task();
		});

		it('Has a reference to its plan', function() {
			expect(task.plan).to.be.a('number');
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
});

