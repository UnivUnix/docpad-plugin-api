'use strict';

// Test our plugin using DocPad's testers
var path = require('path');
require('docpad').require('testers').test({ testerClass: 'RendererTester', pluginPath: path.join(__dirname, '..') });