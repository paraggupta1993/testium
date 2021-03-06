// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var LOG_DIRECTORY, WELCOME_MESSAGE;
  LOG_DIRECTORY = '' + __dirname + '/../../log';
  WELCOME_MESSAGE = "\nWebDriver repl!\nMethods are available in scope. Try: navigateTo 'google.com'\nType `methods` to see what's available.";
  module.exports = function (browserName) {
    var createBrowser, csrepl, extend, getBrowser, getMethods, normalize, selenium;
    require('../test_setup/store').set({
      logDirectory: LOG_DIRECTORY,
      browser: browserName,
      screenshotDirectory: '' + LOG_DIRECTORY + '/screenshots',
      seleniumServer: 'http://127.0.0.1:4444/wd/hub'
    });
    selenium = require('../selenium');
    csrepl = require('coffee-script-redux/lib/repl');
    extend = require('underscore').extend;
    getBrowser = require('../test_setup/browser').getBrowser;
    normalize = function (url) {
      if (url.indexOf('http') === -1) {
        return 'http://' + url;
      } else {
        return url;
      }
    };
    createBrowser = function () {
      var _navigateTo, browser;
      browser = getBrowser();
      _navigateTo = browser.navigateTo;
      browser.navigateTo = function (url, options) {
        url = normalize(url);
        return _navigateTo.call(browser, url, options);
      };
      return browser;
    };
    selenium.start(null, null, LOG_DIRECTORY, 80, function (error) {
      var browser, cli;
      if (null != error)
        throw error;
      require('coffee-script-redux/register');
      console.log(WELCOME_MESSAGE);
      cli = csrepl.start({ prompt: '%> ' });
      cli.on('exit', function (exitCode) {
        return browser.close(function () {
          return selenium.cleanup(function () {
            return process.exit(exitCode);
          });
        });
      });
      browser = createBrowser();
      extend(cli.context, browser);
      return cli.context.methods = getMethods(browser);
    });
    getMethods = function (browser) {
      var methods, prop, properties;
      properties = Object.keys(browser);
      methods = [];
      for (var i$ = 0, length$ = properties.length; i$ < length$; ++i$) {
        prop = properties[i$];
        if (typeof browser[prop] === 'function')
          methods.push(prop);
      }
      return methods.sort().join(', ');
    };
    return process.on('unhandledException', function () {
      return selenium.cleanup(function () {
        return process.exit(1);
      });
    });
  };
}.call(this);
