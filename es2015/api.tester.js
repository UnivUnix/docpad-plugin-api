'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Export plugin tester
module.exports = function (testers) {
  var chai = require('chai');
  var request = require('request');
  var expect = chai.expect;

  return function (_testers$ServerTester) {
    _inherits(ApiTester, _testers$ServerTester);

    function ApiTester() {
      _classCallCheck(this, ApiTester);

      return _possibleConstructorReturn(this, (ApiTester.__proto__ || Object.getPrototypeOf(ApiTester)).apply(this, arguments));
    }

    _createClass(ApiTester, [{
      key: 'testServer',
      value: function testServer() {
        // Prepare
        var tester = this;

        // Test
        this.suite('api plugin', function (suite, test) {
          var baseUrl = 'http://localhost:' + tester.docpad.config.port;

          test('GET ' + tester.docpad.config.plugins.api.baseApiUrl + '/engine/version url', function (done) {
            var fileUrl = '' + baseUrl + tester.docpad.config.plugins.api.baseApiUrl + '/engine/version';
            request(fileUrl, function (err, response, actual) {
              if (err) {
                return done(err);
              }
              var actualStr = actual.match(/docpad-plugin-api/);
              var expectedStr = 'docpad-plugin-api';
              expect(actualStr[0]).to.equal(expectedStr);
              return done();
            });
          });

          test('GET ' + tester.docpad.config.plugins.api.baseApiUrl + '/test', function (done) {
            var fileUrl = '' + baseUrl + tester.docpad.config.plugins.api.baseApiUrl + '/test';
            request(fileUrl, function (err, response, actual) {
              if (err) {
                return done(err);
              }
              var actualStr = actual.match(/OK/);
              var expectedStr = 'OK';
              expect(actualStr[0]).to.equal(expectedStr);
              return done();
            });
          });
        });
      }
    }]);

    return ApiTester;
  }(testers.ServerTester);
};