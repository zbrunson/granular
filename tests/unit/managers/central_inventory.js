'use strict';

var expect = require('chai').expect;
var path = require('path');

var config = require(path.join(process.env.PROJECT_ROOT, 'config', 'config'));
var centralInventory = require(path.join(process.env.PROJECT_ROOT, 'lib', 'managers', 'central_inventory'));

describe('lib/managers/central_inventory.js', function() {
	it('Initial contents are set from config', function() {
		var contents = centralInventory.getContents();

		Object.keys(contents).forEach(function(product) {
			expect(contents[product]).to.equal(config.inventory[product]);
		});
	});

	it('hasInventory returns true for enough inventory', function() {
		expect(centralInventory.hasInventory('water', 1)).to.be.true;
	});

	it('hasInventory returns false for not enough inventory', function() {
		expect(centralInventory.hasInventory('water', Infinity)).to.be.false;
	});

	it('useProduct works if there is enough product', function() {
		function call() {
			centralInventory.useProduct('water', 0)
		}

		expect(call).to.not.throw(Error);
	});

	it('useProduct throws an error if there is not enough product', function() {
		function call() {
			centralInventory.useProduct('water', Infinity)
		}

		expect(call).to.throw(Error);
	});
});

