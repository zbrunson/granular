'use strict';

var expect = require('chai').expect;
var path = require('path');

var Plan = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'plan'));

describe('lib/objects/plan.js', function() {
	describe('structure', function() {
		var plan;
		before(function() {
			plan = new Plan();
		});

		it('Can have multiple tasks', function() {
			expect(plan.tasks).to.exist;
			expect(plan.tasks).to.be.an('array');
		});

		it('Can have a name', function() {
			expect(plan.name).to.exist;
			expect(plan.name).to.be.a('string');
		});

		it('Has an ID', function() {
			expect(plan.id).to.exist;
			expect(plan.id).to.be.a('number');
		});
	});
});

