var help = require("./help");
var parsers = require("./parsers");
var path = require("../vendor/_path");

var Got = {};

Got.log = function(repo, version, _path, callback) {
  repo = path.abspath(repo);
  var args = ["log", "-z", "--summary"]

  if (version) {
    args = args.concat([version])
  }

  if (_path) {
    args = args.concat(["--", _path]);
  }

  help.gitExec(repo, args, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parsers.logFile(data));
    }
  });
};

Got.branch = function(repo, callback) {
  repo = path.abspath(repo);

  var args = ["branch"]

  help.getExec(repo, args, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parsers.branch(data);
    }
  });
};

exports.log = Got.log;
