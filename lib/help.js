var fs = require('fs');
var path = require('path');

var checkRepository = function (repo, commands, callback) {
  var gitCommands = ["--git-dir=" + gitDir];

  fs.stat(function (err, stat) {
    if (err) {
      callback(err);
    } else {
      fs.stat(path.join(repo, ".git"), function (err, stat) {
        if (err) {
          callback(gitCommands
                    .concat(["--work-tree" + this.repo])
                    .concat(commands));
        } else {
          callback(gitCommands.concat(commands));
        }
      });
    }
  })
};


var gitExec = function (repo, _commands, callback) {
  checkRepository(repo, _commands, function (err, commands) {
    var child = ChildProcess.spawn("git", commands);

    var stdout = [];
    var stderr = [];

    child.stdout.setEncoding('binary');

    child.stdout.addListener('data', function (text) {
      stdout[stdout.length] = text;
    });

    child.stderr.addListener('data', function (text) {
      stderr[stderr.length] = text;
    });

    child.addListener('exit', function (code) {
      if (code > 0) {
        callback(new Error("git " + commands.join(" ") + "\n" + stderr.join('')));
      } else {
        callback(null, stdout.join(''));
      }
    });

    child.stdin.end();
  });
};
