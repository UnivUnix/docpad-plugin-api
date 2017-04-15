const path = require('path');
const packJson = require('../package.json');

// Export plugin
module.exports = function (BasePlugin) {
  // Define plugin
  return class ApiPlugin extends BasePlugin {

    get name () {
      return 'api';
    }

    get initialConfig () {
      return {
        cfgSrc: []
      };
    }

    serverExtend (opts) {
      // Error types
      const DPA_CONFIG_ERROR = 'DPAConfigError';
      const DPA_SRC_ERROR = 'DPASrcError';

      // Extract server from options.
      const {server} = opts;
      const docpad = this.docpad;
      const rootPath = docpad.getConfig().rootPath;
      const apis = [];
      let configSrc, configJson, func;
      for (configSrc of this.config.cfgSrc) {
        try {
          // Variables inside try block.
          let jsSrc;
          const api = {};
          // Load config file.
          configJson = require(path.join(rootPath, configSrc));
          // Check if baseApiUrl is set.
          if (!configJson.baseApiUrl) {
            const dpaError = new Error('No baseApiUrl set in config file.\n\tIn ' + path.join(rootPath, configSrc));
            dpaError.name = DPA_CONFIG_ERROR;
            throw dpaError;
          }
          api.baseApiUrl = configJson.baseApiUrl;
          // Check if there's any source set.
          if (!configJson.src || configJson.src.length === 0) {
            const dpaError = new Error('The src parameter is\'nt properly configured.\n\tIn ' + path.join(rootPath, configSrc));
            dpaError.name = DPA_CONFIG_ERROR;
            throw dpaError;
          }
          api.src = [];
          for (jsSrc of configJson.src) {
            try {
              api.src.push(require(path.join(rootPath, jsSrc)));
            }
            catch (err) {
              const dpaError = new Error(err.name + ': ' + err.message + '\n\tIn ' + path.join(rootPath, jsSrc));
              dpaError.name = DPA_SRC_ERROR;
              throw dpaError;
            }
          }
          // When all configuration is ok, insert in apis array.
          apis.push(api);
        }
        catch (err) {
          docpad.log('error', 'Api - ' + err.name + ': ' + err.message);
        }
      }
      docpad.log('info', 'Api - Loaded files: ' + apis.length);

      // Default route.
      server.get('/engine/version', (req, res) =>
        res.json({
          name: packJson.name,
          dev: packJson.author,
          version: packJson.version
        })
      );

      let api;
      // Go to custom API routes.
      for (api of apis) {
        for (func of api.src) {
          func(opts, api.baseApiUrl);
        }
      }
    }
  };
};
