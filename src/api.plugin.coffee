# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class ApiPlugin extends BasePlugin
		# Plugin name
		name: 'api'

		config:
			apiSource:
		
		# The rest of your plugin definition goes here
    # ...
		serverExtend: (opts) ->
			#Extract server from options.
			{server} = opts

			server.get '/api/engine/version', (req, res, next) ->
				res.json({
					name: 'docpad-plugin-api',
					dev: 'UnivUnix',
					version: '2.0.0'
					})
