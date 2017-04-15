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
        // Error types
        var DPA_CONFIG_ERROR = 'DPAConfigError';
        var DPA_SRC_ERROR = 'DPASrcError';

        // Extract server from options.
        var server = opts.server;

        var docpad = this.docpad;
        var rootPath = docpad.getConfig().rootPath;
        var apis = [];
        var configSrc = void 0,
            configJson = void 0,
            func = void 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.config.cfgSrc[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            configSrc = _step.value;

            try {
              // Variables inside try block.
              var jsSrc = void 0;
              var _api = {};
              // Load config file.
              configJson = require(path.join(rootPath, configSrc));
              // Check if baseApiUrl is set.
              if (!configJson.baseApiUrl) {
                var dpaError = new Error('No baseApiUrl set in config file.\n\tIn ' + path.join(rootPath, configSrc));
                dpaError.name = DPA_CONFIG_ERROR;
                throw dpaError;
              }
              _api.baseApiUrl = configJson.baseApiUrl;
              // Check if there's any source set.
              if (!configJson.src || configJson.src.length === 0) {
                var _dpaError = new Error('The src parameter is\'nt properly configured.\n\tIn ' + path.join(rootPath, configSrc));
                _dpaError.name = DPA_CONFIG_ERROR;
                throw _dpaError;
              }
              _api.src = [];
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = configJson.src[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  jsSrc = _step3.value;

                  try {
                    _api.src.push(require(path.join(rootPath, jsSrc)));
                  } catch (err) {
                    var _dpaError2 = new Error(err.name + ': ' + err.message + '\n\tIn ' + path.join(rootPath, jsSrc));
                    _dpaError2.name = DPA_SRC_ERROR;
                    throw _dpaError2;
                  }
                }
                // When all configuration is ok, insert in apis array.
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              apis.push(_api);
            } catch (err) {
              docpad.log('error', 'Api - ' + err.name + ': ' + err.message);
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

        docpad.log('info', 'Api - Loaded files: ' + apis.length);

        // Default route.
        server.get('/engine/version', function (req, res) {
          return res.json({
            name: packJson.name,
            dev: packJson.author,
            version: packJson.version
          });
        });

        var api = void 0;
        // Go to custom API routes.
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = apis[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            api = _step2.value;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = api.src[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                func = _step4.value;

                func(opts, api.baseApiUrl);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
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
          cfgSrc: []
        };
      }
    }]);

    return ApiPlugin;
  }(BasePlugin);
};