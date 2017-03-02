# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
  port: 9754
  # Plugins configuration
  plugins:
    api:
      source: [
        uri: 'api/api-test.js'
        type: 'js'
        ]
}

# Export the DocPad Configuration
module.exports = docpadConfig
