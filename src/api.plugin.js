const path = require('path')
const packJson = require('../package.json')

// Export plugin
module.exports = (BasePlugin) => {
  // Define plugin
  class ApiPlugin extends BasePlugin {
    constructor () {
      super()
      // Plugin name
      this.name = 'api'
      this.config = {
        baseApiUrl: '/api',
        source: [{
          file: ''
        },
        {
          file: ''
        }]
      }
    }

    serverExtend (opts) {
      // Extract server from options.
      const server = opts.server
      const docpad = this.docpad
      const rootPath = docpad.getConfig().rootPath
      let customApis = []
      for (let src of this.config.source) {
        try {
          customApis.push(require(path.join(rootPath, src.file)))
        } catch (error) {
          docpad.log('error', 'Api - Error: ' + error.message)
        }
      }
      docpad.log('info', 'Api - Loaded files: ' + customApis.length)

      // Default route.
      server.get(`${this.config.baseApiUrl}/engine/version`, (req, res, next) =>
        res.json({
          name: packJson.name,
          dev: packJson.author,
          version: packJson.version
        })
      )

      // Go to custom API routes.
      for (let func of customApis) {
        func(opts, this.config.baseApiUrl)
      }
    }
  }
}
