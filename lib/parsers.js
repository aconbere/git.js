var logFile = function (text) {
  if (text.length === 0) {
    callback(null, "");
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

    callback(null, log);
  }
};
