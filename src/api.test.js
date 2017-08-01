// Test our plugin using DocPad's testers
const path = require('path');
require('docpad').require('testers').test({testerClass: 'RendererTester', pluginPath: path.join(__dirname, '..')});
