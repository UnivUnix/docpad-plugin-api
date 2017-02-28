module.exports = function (opts) {
  var server = opts.server

  server.get('/api/test', function (req, res, next) {
    return res.json({
      test: 'OK'
    })
  })
}
