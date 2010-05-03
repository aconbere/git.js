var help = require("./help");
var parsers = require("./parsers");
var path = require("../vendor/_path");

var Git = {};

Git.log = function(repo, version, _path, callback) {
  repo = path.abspath(repo);
  var args = ["log", "-z", "--summary"]

  if (version) {
    args = args.concat([version])
  }

  if (_path) {
    args = args.concat(["--", _path]);
  }

  help.execWithRepository(repo, args, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parsers.logFile(data));
    }
  });
};

Git.branch = function (repo, callback) {
  repo = path.abspath(repo);

  var args = ["branch"]

  help.execWithRepository(repo, args, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parsers.branch(data));
    }
  });
};

Git.checkout = function (repo, name, callback) {
  repo = path.abspath(repo);

  var args = ["checkout", name]

  help.execWithRepository(repo, args, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parsers.branch(data));
    }
  });
};

Git.clone = function (from, to, callback) {
  from = path.abspath(from);
  to = path.abspath(to);

  var args = ["clone", from ,to];

  help.exec(args, function (err, data) {
    sys.p(data);
  });
};

exports.log = Git.log;
exports.branch = Git.branch;
exports.checkout = Git.checkout;
exports.clone = Git.clone;
