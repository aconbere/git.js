var help = require("./help");
var parsers = require("./parsers");

var Got = {};

Got.log = function(repo, version, path, callback) {
  var args = ["log", "-z", "--summary", version, "--", path];
  help.getExec(repo, args, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parser.logFile(data));
    }
  });
};
