# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
  # Plugins configuration
  plugins:
    api:
      baseApiUrl: '/APIURLTEST'
      source: [
        file: 'api/api-test.js'
        ]
}

# Export the DocPad Configuration
module.exports = docpadConfig
