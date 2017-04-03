// Export plugin tester
module.exports = function (testers) {
  const chai = require('chai');
  const request = require('request');
  const expect = chai.expect;

  return class ApiTester extends testers.ServerTester {
    testServer () {
      // Prepare
      const tester = this;

      // Test
      this.suite('api plugin', (suite, test) => {
        const baseUrl = `http://localhost:${tester.docpad.config.port}`;

        test(`GET ${tester.docpad.config.plugins.api.baseApiUrl}/engine/version url`, (done) => {
          const fileUrl = `${baseUrl}${tester.docpad.config.plugins.api.baseApiUrl}/engine/version`;
          request(fileUrl, (err, response, actual) => {
            if (err) {
              return done(err);
            }
            const actualStr = actual.match(/docpad-plugin-api/);
            const expectedStr = 'docpad-plugin-api';
            expect(actualStr[0]).to.equal(expectedStr);
            return done();
          });
        });

        test(`GET ${tester.docpad.config.plugins.api.baseApiUrl}/test`, (done) => {
          const fileUrl = `${baseUrl}${tester.docpad.config.plugins.api.baseApiUrl}/test`;
          request(fileUrl, (err, response, actual) => {
            if (err) {
              return done(err);
            }
            const actualStr = actual.match(/OK/);
            const expectedStr = 'OK';
            expect(actualStr[0]).to.equal(expectedStr);
            return done();
          });
        });
      });
    }
  };
};
