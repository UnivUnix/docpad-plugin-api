[![Build Status](https://travis-ci.org/UnivUnix/docpad-plugin-api.svg?branch=master)](https://travis-ci.org/UnivUnix/docpad-plugin-api)
<span class="badge-npmversion"><a href="https://npmjs.org/package/docpad-plugin-api" title="View this project on NPM"><img src="https://img.shields.io/npm/v/docpad-plugin-api.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/docpad-plugin-api" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/docpad-plugin-api.svg" alt="NPM downloads" /></a></span>


# Api plugin for [DocPad](http://docpad.org)

# ATENTION

This plugin is in development and it doesn't have any stable version. Don't use in production systems.

<!-- INSTALL/ -->

## Install

``` bash
docpad install api
```

<!-- /INSTALL -->

## How to use the plugin

* First, you need to create a Javascript file inside your Docpad project.
You must create that as a NodeJS module. Check the next example:

``` javascript
module.exports = function (opts) {
  var server = opts.server

  // Put your routes here.
  server.get('/api/test', function (req, res, next) {
    return res.json({
      test: 'OK'
    })
  })
}
```

* Finally, you have to put the path of the file in Docpad configuration file:

``` coffee-script
# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
  # Plugins configuration
  plugins:
    api:
      apiSource: 'api/api-test.js'
}

# Export the DocPad Configuration
module.exports = docpadConfig
```


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `HISTORY.md` file.](https://github.com/univunix/docpad-plugin-api/blob/master/HISTORY.md#files)

<!-- /HISTORY -->


<!-- LICENSE/ -->

## License

Unless stated otherwise all works are:

- Copyright &copy; UnivUnix <admins@univunix.com> (https://univunix.com)

and licensed under:

- The incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://opensource.org/licenses/mit-license.php)

<!-- /LICENSE -->
