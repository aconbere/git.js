var fs = require('fs');
var sys = require('sys');
var path = require('path');
var child_process = require("child_process");

var checkRepository = function (repo, commands, callback) {
  var gitDir = path.join(repo, ".git");
  var gitCommands = ["--git-dir=" + gitDir];

  fs.stat(repo, function (err, stat) {
    if (err) {
      callback(err);
    } else {
      fs.stat(path.join(repo, ".git"), function (err, stat) {
        if (err) {
          callback(null, gitCommands
                          .concat(["--work-tree" + repo])
                          .concat(commands));
        } else {
          callback(null, gitCommands.concat(commands));
        }
      });
    }
  })
};


var gitExec = function (repo, _commands, callback) {
  checkRepository(repo, _commands, function (err, commands) {
    if (err) {
      callback(err);
    } else {
      var child = child_process.spawn("git", commands);

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
    }
  });
};

exports.gitExec = gitExec;
