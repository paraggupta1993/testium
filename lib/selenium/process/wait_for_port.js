// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var isAvailable, logError, portscanner, waitFor;
  portscanner = require('portscanner');
  logError = require('../../log/error');
  isAvailable = function (port, callback) {
    return portscanner.checkPortStatus(port, '127.0.0.1', function (error, status) {
      if (null != error)
        return callback(error);
      return callback(null, status === 'closed');
    });
  };
  waitFor = function (port, timeout, callback) {
    var check, startTime;
    startTime = Date.now();
    check = function () {
      return portscanner.checkPortStatus(port, '127.0.0.1', function (error, status) {
        var timedOut;
        if (null != error)
          logError(error.message);
        if (null != error || status === 'closed') {
          if (Date.now() - startTime >= timeout) {
            timedOut = true;
            return callback(timedOut);
          }
          return setTimeout(check, 100);
        } else {
          return callback();
        }
      });
    };
    return check();
  };
  module.exports = {
    isAvailable: isAvailable,
    waitFor: waitFor
  };
}.call(this);
