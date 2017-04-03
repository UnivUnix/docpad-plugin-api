// Export plugin tester
module.exports = (testers) => {
  const chai = require('chai')
  const request = require('request')
  const expect = chai.expect

  class ApiTester extends testers.ServerTester {
    testServer (next) {
      // Prepare
      let tester = this
      // Create server
      super()
      // Test
      this.suite('plugin api', (suite, test) => {
        const baseUrl = `http://localhost:${tester.docpad.config.port}`

        test(`GET ${tester.docpad.config.plugins.api.baseApiUrl}/engine/version url`, (done) => {
          let fileUrl = `${baseUrl}${tester.docpad.config.plugins.api.baseApiUrl}/engine/version`
          request(fileUrl, (err, response, actual) => {
            if (err) {
              return done(err)
            }
            let actualStr = actual.match(/docpad-plugin-api/)
            let expectedStr = 'docpad-plugin-api'
            expect(actualStr[0]).to.equal(expectedStr)
            return done()
          })
        })

        test(`GET ${tester.docpad.config.plugins.api.baseApiUrl}/test`, (done) => {
          let fileUrl = `${baseUrl}${tester.docpad.config.plugins.api.baseApiUrl}/test`
          request(fileUrl, (err, response, actual) => {
            if (err) {
              return done(err)
            }
            let actualStr = actual.match(/OK/)
            let expectedStr = 'OK'
            expect(actualStr[0]).to.equal(expectedStr)
            return done()
          })
        })
      })
    }
  }
}
