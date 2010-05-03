var logFile = function (text) {
  if (text.length === 0) {
    return null
  } else {
    var log = {};

    text.split("\0").forEach(function (entry) {
      var commit = entry.match(/^commit ([a-f0-9]{40})/)[1];

      var data = {
        message: entry.match(/\n\n([\s\S]*)/)[1].trim()
      }

      entry.match(/^[A-Z][a-z]*:.*$/gm).forEach(function (line) {
        var matches = line.match(/^([A-Za-z]+):\s*(.*)$/);
        data[matches[1].toLowerCase()] = matches[2];
      });

      log[commit] = data;
    });

    return log;
  }
};

var branch = function (text) {
  text = text.trim();

  if (text.length === 0) {
    return null
  } else {
    var branches = [];
    var active = null;

    text.split("\n").forEach(function (branch) {
      if (branch) {
        branch = branch.trim();
        if (branch[0] == "*") {
          branch = branch.slice(2)
          active = branch;
        }
        branches.push(branch);
      }
    });

    return { branches: branches
           , active: active
           };
  }
};

var checkout = function (text) {
  text = text.trim();
  if (text.length === 0) {
    return null
  } else {
    // error: pathspec 'asdf' did not match any file(s) known 
    //
    // M	lib/got.js
    // M	lib/parsers.js
    // Already on 'test
    //
    //
  }
};

exports.logFile = logFile;
exports.branch = branch;
exports.checkout = checkout;
