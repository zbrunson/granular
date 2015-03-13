'use strict';

var path = require('path');

var config = require(path.join(process.env.PROJECT_ROOT, 'config', 'config'));
var inventory = new (require(path.join(process.env.PROJECT_ROOT, 'lib', 'objects', 'inventory')))(config.inventory);

exports.getContents = function getContents() {
	return inventory.contents;
};

exports.hasInventory = function hasInventory(product, amount) {
	return inventory.contents[product] >= amount;
};

exports.useProduct = function useProduct(product, amount) {
	if (inventory.contents[product] < amount) {
		throw new Error('Tried to use more product than is in inventory, product: ' +
			product + ' amount: ' + amount + ' inventory amount: ' + inventory.contents[product]);
	}

	inventory.contents[product] -= amount;
};

