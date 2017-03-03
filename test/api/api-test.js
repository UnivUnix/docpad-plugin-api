module.exports = function (opts, baseApiUrl) {
  var server = opts.server

  server.get(baseApiUrl + '/test', function (req, res, next) {
    return res.json({
      test: 'OK'
    })
  })

  server.get(baseApiUrl + '/bbbb', function (req, res, next) {
    var err = new Error()
    next(err)
  })
}