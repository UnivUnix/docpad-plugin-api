# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
  # Plugins configuration
  plugins:
    api:
      baseApiUrl: '/APIURLTEST'
      source: [
        uri: 'api/api-test.js'
        type: 'js'
        ]
}

# Export the DocPad Configuration
module.exports = docpadConfig
