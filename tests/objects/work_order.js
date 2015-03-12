'use strict';

var expect = require('chai').expect;
var path = require('path');

var WorkOrder = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'work_order'));

describe('lib/objects/work_order.js', function() {
	describe('structure', function() {
		var workOrder;
		before(function() {
			workOrder = new WorkOrder();
		});

		it('Has a reference to its task', function() {
			expect(workOrder.task).to.be.a('number');
		});

		it('Tracks the quantity of product of product applied to a field', function() {
			expect(workOrder.product).to.be.a('string');
			expect(workOrder.targetQuantity).to.be.a('number');
			expect(workOrder.appliedQuantity).to.be.a('number');
		});

		it('Has a status', function() {
			expect(workOrder.status).to.equal('not started');
		});
	});
});

