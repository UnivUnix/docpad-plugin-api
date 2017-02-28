# Export Plugin Tester
module.exports = (testers) ->

  chai = require('chai')
  mocha = require('mocha')
  request = require('request')

  expect = chai.expect

  # Define ApiTester
  class ApiTester extends testers.ServerTester

    testServer: (next) ->
      # Prepare
      tester = @

      # Create the server
      super

      # Test
      @suite 'plugin api', (suite,test) ->
        # Prepare
        baseUrl = "http://localhost:#{tester.docpad.config.port}"
        outExpectedPath = tester.config.outExpectedPath
        plugin = tester.docpad.getPlugin('api')

        test 'GET api/engine/version url', (done) ->
          fileUrl = "#{baseUrl}/api/engine/version"
          request fileUrl, (err,response,actual) ->
            return done(err)  if err
            actualStr = actual.match(/docpad-plugin-api/)
            expectedStr ='docpad-plugin-api'
            expect(actualStr[0]).to.equal(expectedStr)
            done()

        test 'GET api/test', (done) ->
          fileUrl = "#{baseUrl}/api/test"
          request fileUrl, (err, response, actual) ->
            return done(err) if err
            actualStr = actual.match(/OK/)
            expectedStr = 'OK'
            expect(actualStr[0]).to.equal(expectedStr)
            done()
