var assert = require("assert");
var sys = require("sys");
var fs = require("fs");

var minitest = require("../vendor/minitest.js/minitest");

var got = require("../lib/got");

minitest.setupListeners();

minitest.context("log", function () {
  this.assertion("it should output the log text without erroring", function (test) {
    got.log(".", null, null, function (err, data) {
      if (err) {
        assert.ok(false);
      } else {
        assert.ok(true);
      }
      test.finished();
    });
  });

  this.assertion("it should output errors if not a git dir", function (test) {
    got.log("/tmp", null, null, function (err, data) {
      if (err) {
        assert.ok(true);
      } else {
        assert.ok(false);
      }
      test.finished();
    });
  });
});

minitest.context("branch", function () {
  this.assertion("it should output a list of branches", function (test) {
    got.branch(".", function (err, data) {
      if (err) {
        assert.ok(false);
      } else {
        sys.p(data);
        assert.ok(true);
      }
      test.finished();
    });
  });

  this.assertion("it should output errors if not a git dir", function (test) {
    got.log("/tmp", null, null, function (err, data) {
      if (err) {
        assert.ok(true);
      } else {
        assert.ok(false);
      }
      test.finished();
    });
  });
});
