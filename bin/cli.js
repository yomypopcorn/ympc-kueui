#!/usr/bin/env node

var path = require('path');
var pkg = require(path.resolve(__dirname, '../package.json'));
var bole = require('bole');

var config = require('../config.js');

var logLevel = config.debug === true
  ? 'debug'
  : config.debug || 'error';

bole.output({
  level: logLevel,
  stream: process.stdout
});

if (config.version) {
	console.log(pkg.version);
	process.exit(0);
}

var server = require('../server')(config);
server.start();
