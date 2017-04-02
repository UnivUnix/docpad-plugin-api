// Export plugin tester
module.exports = (testers) => {
	const chai = require('chai');
	const request = require('request');
	
	const expect = chai.expect;
	
	class ApiTester extends testers.ServerTester {
		testServer(next) {
			// Prepare
			let tester = this;
			
			// Create server
			super();
			
			// Test
			this.suite('plugin api', (suite, test) => {
				const baseUrl = `http://localhost:${tester.docpad.config.port}`;
				const plugin = tester.docpad.getPlugin('api');
				
				
			});
			
		}
	}
}
