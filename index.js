'use strict';

process.env.PROJECT_ROOT = __dirname;

var path = require('path');

var input = require(path.join(process.env.PROJECT_ROOT, 'lib', 'input'));
var uiState = require(path.join(process.env.PROJECT_ROOT, 'lib', 'ui', 'state'));

uiState.initialize();
input.start();

