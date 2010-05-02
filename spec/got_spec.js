var assert = require("assert");
var sys = require("sys");
var fs = require("fs");

var minitest = require("../vendor/minitest.js/minitest");

var got = require("../lib/got");

minitest.setupListeners();

minitest.context("log", function () {
  this.assertion("it should output the log text without erroring", function (test) {
    got.log(function (err, data) {
      sys.p(data);
      test.finished();
    });
  });
});
