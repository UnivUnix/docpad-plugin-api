path = require('path')
packJson = require('../package.json');
# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class ApiPlugin extends BasePlugin
		# Plugin name
		name: 'api'

		config:
			apiSource: ''

		serverExtend: (opts) ->
			#Extract server from options.
			{server} = opts
			docpad = @docpad
			rootPath = docpad.getConfig().rootPath
			customApi = require(path.join(rootPath, @config.apiSource))

			# Default route.
			server.get '/api/engine/version', (req, res, next) ->
				res.json({
					name: packJson.name,
					dev: packJson.author,
					version: packJson.version
					})

			# Go to custom API routes.
			customApi(opts)
