// Test our plugin using DocPad's testers
const path = require('path');
require('docpad').require('testers').test({
    testerName: 'api plugin common test',
    testerClass: 'ServerTester',
    pluginPath: path.join(__dirname, '..'),
    pluginName: 'api',
    autoExit: 'safe'
}, {
    plugins: {
        api: {
            cfgSrc: [
                'testapi1/dpaconfig.json'
            ]
        }
    }
});
