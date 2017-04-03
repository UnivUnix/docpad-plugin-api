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
        baseApiUrl: '/api',
        source: [{
          file: ''
        }]
      };
    }

    serverExtend (opts) {
      // Extract server from options.
      const {server} = opts;
      const docpad = this.docpad;
      const rootPath = docpad.getConfig().rootPath;
      const customApis = [];
      let src;
      for (src of this.config.source) {
        try {
          customApis.push(require(path.join(rootPath, src.file)));
        }
        catch (error) {
          docpad.log('error', 'Api - Error: ' + error.message);
        }
      }
      docpad.log('info', 'Api - Loaded files: ' + customApis.length);

      // Default route.
      server.get(`${this.config.baseApiUrl}/engine/version`, (req, res) =>
        res.json({
          name: packJson.name,
          dev: packJson.author,
          version: packJson.version
        })
      );

      // Go to custom API routes.
      let func;
      for (func of customApis) {
        func(opts, this.config.baseApiUrl);
      }
    }
  };
};
