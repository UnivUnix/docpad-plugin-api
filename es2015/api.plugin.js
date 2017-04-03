'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');
var packJson = require('../package.json');

// Export plugin
module.exports = function (BasePlugin) {
  // Define plugin
  return function (_BasePlugin) {
    _inherits(ApiPlugin, _BasePlugin);

    function ApiPlugin() {
      _classCallCheck(this, ApiPlugin);

      return _possibleConstructorReturn(this, (ApiPlugin.__proto__ || Object.getPrototypeOf(ApiPlugin)).apply(this, arguments));
    }

    _createClass(ApiPlugin, [{
      key: 'serverExtend',
      value: function serverExtend(opts) {
        // Extract server from options.
        var server = opts.server;

        var docpad = this.docpad;
        var rootPath = docpad.getConfig().rootPath;
        var customApis = [];
        var src = void 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.config.source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            src = _step.value;

            try {
              customApis.push(require(path.join(rootPath, src.file)));
            } catch (error) {
              docpad.log('error', 'Api - Error: ' + error.message);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        docpad.log('info', 'Api - Loaded files: ' + customApis.length);

        // Default route.
        server.get(this.config.baseApiUrl + '/engine/version', function (req, res) {
          return res.json({
            name: packJson.name,
            dev: packJson.author,
            version: packJson.version
          });
        });

        // Go to custom API routes.
        var func = void 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = customApis[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            func = _step2.value;

            func(opts, this.config.baseApiUrl);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: 'name',
      get: function get() {
        return 'api';
      }
    }, {
      key: 'initialConfig',
      get: function get() {
        return {
          baseApiUrl: '/api',
          source: [{
            file: ''
          }]
        };
      }
    }]);

    return ApiPlugin;
  }(BasePlugin);
};