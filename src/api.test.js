// Test our plugin using DocPad's testers
require('docpad').require('testers').test({
  pluginPath: `${__dirname}/..`,
  testerClass: 'ServerTester'
});
