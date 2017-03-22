path = require('path')
packJson = require('../package.json')
# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class ApiPlugin extends BasePlugin
		# Plugin name
		name: 'api'

		config:
			baseApiUrl: '/api'
			source: [
				{
					file: ''
				}, {
					file: ''
				}
			]

		serverExtend: (opts) ->
			#Extract server from options.
			{server} = opts
			docpad = @docpad
			rootPath = docpad.getConfig().rootPath
			customApis = []
			for src in @config.source
				try
					customApis.push(require(path.join(rootPath, src.file)))
				catch error
				  docpad.log('error', 'Api - Error: ' + error.message)
			docpad.log('info', 'Api - Loaded files: ' + customApis.length)

			# Default route.
			server.get "#{@config.baseApiUrl}/engine/version", (req, res, next) ->
				res.json({
					name: packJson.name,
					dev: packJson.author,
					version: packJson.version
					})

			# Go to custom API routes.
			for func in customApis
				func(opts, @config.baseApiUrl)
