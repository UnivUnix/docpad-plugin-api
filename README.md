# Api Plugin for [DocPad](http://docpad.org)

<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.org/UnivUnix/docpad-plugin-api" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/UnivUnix/docpad-plugin-api/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/docpad-plugin-api" title="View this project on NPM"><img src="https://img.shields.io/npm/v/docpad-plugin-api.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/docpad-plugin-api" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/docpad-plugin-api.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/UnivUnix/docpad-plugin-api" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/UnivUnix/docpad-plugin-api.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/UnivUnix/docpad-plugin-api#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/UnivUnix/docpad-plugin-api.svg" alt="Dev Dependency Status" /></a></span>

<!-- /BADGES -->


## How to use the plugin

First, create your API. You have to use Javascript as language
 and you can use NodeJS or ExpressJS methods and objects.

Each Javascript file must have this structure:

```javascript
// Each module.exports MUST BE a function with these two arguments
module.exports = function (opts, baseApiUrl){
  // The ExpressJS server is an attribute of opts.
  var server = opts.server

  // You can use ExpressJS functions (version 3.x)
  server.get(baseApiUrl + '/test', function (req, res, next) {
    return res.json({
      test: 'OK'
    })
  })

  server.get('/bbbb', function (req, res, next) {
    var err = new Error()
    next(err)
  })
}
```

Second, you need to create the api configuration file. It's in JSON format.
This is the new step for newer versions, because you can set different apis using multiple configuration files.

You can name it as you want. In my case, I call it "dpaconfig.json"

```javascript
{
  "baseApiUrl": "/testone",
  "src": [
    "testapi1/src/test11.js",
    "testapi1/src/test12.js"
  ]
}
```

Notes about dbaconfig.json file:
* It's required to set the baseApiUrl and src variables.
* The src routes have to be relative to Docpad website root folder (the same level as docpad configuration file).

Finally, set the route of each dpaconfig file in Docpad configuration file.

```coffee-script
plugins:
  api:
    cfgSrc: [
      'testapi1/dpaconfig.json',
      'testapi2/dpaconfig.json',
      'testapi0/dpaconfig.json'
    ]
```

Notes about configuration:
 *You have to set relative routes using Docpad root folder as base.

And we're done. Enjoy your custom api without refactoring to ExpressJS.

<!-- INSTALL/ -->

<h2>Install</h2>

Install this DocPad plugin by entering <code>docpad install api</code> into your terminal.

<!-- /INSTALL -->


<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/UnivUnix/docpad-plugin-api/blob/master/HISTORY.md#files">Discover the release history by heading on over to the <code>HISTORY.md</code> file.</a>

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

<h2>Contribute</h2>

<a href="https://github.com/UnivUnix/docpad-plugin-api/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://www.univunix.com">Ángel González</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?



<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://UnivUnix.com">Ángel González</a> — <a href="https://github.com/UnivUnix/docpad-plugin-api/commits?author=Aglezabad" title="View the GitHub contributions of Ángel González on repository UnivUnix/docpad-plugin-api">view contributions</a></li>
<li><a href="http://balupton.com">Benjamin Lupton</a> — <a href="https://github.com/UnivUnix/docpad-plugin-api/commits?author=balupton" title="View the GitHub contributions of Benjamin Lupton on repository UnivUnix/docpad-plugin-api">view contributions</a></li>
<li><a href="http://mdm.cc">Michael Duane Mooring</a> — <a href="https://github.com/UnivUnix/docpad-plugin-api/commits?author=mikeumus" title="View the GitHub contributions of Michael Duane Mooring on repository UnivUnix/docpad-plugin-api">view contributions</a></li>
<li><a href="http://robloach.net">Rob Loach</a> — <a href="https://github.com/UnivUnix/docpad-plugin-api/commits?author=RobLoach" title="View the GitHub contributions of Rob Loach on repository UnivUnix/docpad-plugin-api">view contributions</a></li>
<li><a href="https://github.com/vsopvsop">vsopvsop</a> — <a href="https://github.com/UnivUnix/docpad-plugin-api/commits?author=vsopvsop" title="View the GitHub contributions of vsopvsop on repository UnivUnix/docpad-plugin-api">view contributions</a></li>
<li><a href="http://www.univunix.com">Ángel González</a></li>
<li><a href="http://www.procesozombie.com/">fer2d2</a> — <a href="https://github.com/UnivUnix/docpad-plugin-api/commits?author=fer2d2" title="View the GitHub contributions of fer2d2 on repository UnivUnix/docpad-plugin-api">view contributions</a></li></ul>

<a href="https://github.com/UnivUnix/docpad-plugin-api/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://univunix.com">UnivUnix</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
