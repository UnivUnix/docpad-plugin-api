module.exports = function (opts, baseApiUrl) {
  const server = opts.server;

  server.get(baseApiUrl + '/cccc', function (req, res) {
    return res.json({
      test: 'OK'
    });
  });

  server.get(baseApiUrl + '/dddd', function (req, res, next) {
    const err = new Error();
    next(err);
  });
};
