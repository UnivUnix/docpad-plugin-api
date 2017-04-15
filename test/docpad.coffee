# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
  # Plugins configuration
  plugins:
    api:
      cfgSrc: [
        'testapi1/dpaconfig.json',
        'testapi2/dpaconfig.json',
        'testapi0/dpaconfig.json'
      ]
}

# Export the DocPad Configuration
module.exports = docpadConfig
