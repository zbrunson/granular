'use strict';

var expect = require('chai').expect;
var path = require('path');

var util = require(path.join(process.env.PROJECT_ROOT, 'tests', 'lib', 'util'));

var WorkOrder = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'work_order'));

var centralInventory = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'central_inventory'));

describe('lib/objects/work_order.js', function() {
	describe('structure', function() {
		var workOrder;
		beforeEach(function() {
			workOrder = new WorkOrder();
		});

		it('Has a reference to its task', function() {
			expect(workOrder.task).to.not.be.undefined;
		});

		it('Tracks the quantity of product of product applied to a field', function() {
			expect(workOrder.targetQuantity).to.be.a('number');
			expect(workOrder.appliedQuantity).to.be.a('number');
		});

		it('Has a status', function() {
			expect(workOrder.status).to.equal('not started');
		});
	});

	describe('logic', function() {
		var originalInventory;
		before(function() {
			originalInventory = util.copy(centralInventory.getContents());
		});

		after(function() {
			util.restore(originalInventory, centralInventory.getContents());
		});

		var workOrder;
		beforeEach(function() {
			workOrder = new WorkOrder();
		});

		it('setTargetQuantity', function() {
			workOrder.task = {
				getUnallocatedQuantity: function() {
					return 50;
				}
			};

			var amount = 100;
			function call() {
				workOrder.setTargetQuantity(amount);
			}

			expect(call).to.throw(Error);
			expect(workOrder.targetQuantity).to.equal(0);

			amount = 10;
			expect(call).to.not.throw(Error);
			expect(workOrder.targetQuantity).to.equal(10);
		});

		it('addAppliedQuantity', function() {
			workOrder.task = {
				product: 'a',
				appliedQuantity: 0
			};

			var inventory = centralInventory.getContents();
			inventory.a = 100;

			var amount = 1000;
			function call() {
				workOrder.addAppliedQuantity(amount);
			}

			expect(call).to.throw(Error);
			expect(workOrder.appliedQuantity).to.equal(0);
			expect(workOrder.task.appliedQuantity).to.equal(0);

			amount = 10;
			expect(call).to.not.throw(Error);
			expect(workOrder.appliedQuantity).to.equal(10);
			expect(workOrder.task.appliedQuantity).to.equal(10);

			expect(call).to.not.throw(Error);
			expect(workOrder.appliedQuantity).to.equal(20);
			expect(workOrder.task.appliedQuantity).to.equal(20);
		});

		it('setAppliedQuantity', function() {
			workOrder.task = {
				product: 'a',
				appliedQuantity: 0
			};

			var inventory = centralInventory.getContents();
			inventory.a = 100;

			var amount = 1000;
			function call() {
				workOrder.setAppliedQuantity(amount);
			}

			expect(call).to.throw(Error);
			expect(workOrder.appliedQuantity).to.equal(0);
			expect(workOrder.task.appliedQuantity).to.equal(0);

			amount = 10;
			expect(call).to.not.throw(Error);
			expect(workOrder.appliedQuantity).to.equal(10);
			expect(workOrder.task.appliedQuantity).to.equal(10);

			expect(call).to.not.throw(Error);
			expect(workOrder.appliedQuantity).to.equal(10);
			expect(workOrder.task.appliedQuantity).to.equal(10);
		});

		it('start', function() {
			var calls = 0;
			workOrder.task = {
				product: 'a',
				updateStatus: function() {
					calls++;
				}
			};

			var inventory = centralInventory.getContents();
			inventory.a = 100;

			// wrapping to keep `this` context
			function call() {
				workOrder.start();
			}

			workOrder.targetQuantity = 1000;
			expect(call).to.throw(Error);

			expect(workOrder.status).to.equal('not started');

			workOrder.targetQuantity = 10;
			expect(call).to.not.throw(Error);

			expect(workOrder.status).to.equal('in progress');
			expect(calls).to.equal(1);
		});

		it('complete', function() {
			var calls = 0;
			workOrder.task = {
				updateStatus: function() {
					calls++;
				}
			};

			expect(workOrder.status).to.equal('not started');

			workOrder.complete();

			expect(workOrder.status).to.equal('completed');
			expect(calls).to.equal(1);
		});
	});
});

