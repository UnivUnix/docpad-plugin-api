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
				customApis.push(require(path.join(rootPath, src.file)))
			docpad.log('info', 'Api - Loaded files: ' + @config.source.length)

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
