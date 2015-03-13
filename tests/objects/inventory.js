'use strict';

var expect = require('chai').expect;
var path = require('path');

var Inventory = require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'inventory'));

describe('lib/objects/inventory.js', function() {
	describe('structure', function() {
		var inventory;
		before(function() {
			inventory = new Inventory();
		});

		it('Has contents', function() {
			expect(inventory.contents).to.be.an('object');
		});

		it('Initializes contents', function() {
			var initialContents = {
				a: 10,
				b: 20
			};
			inventory = new Inventory(initialContents);

			Object.keys(initialContents).forEach(function(key) {
				expect(inventory.contents[key]).to.equal(initialContents[key]);
			});
		});
	});
});

