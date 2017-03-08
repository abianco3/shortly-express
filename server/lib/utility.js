var Promise = require('bluebird');
var request = Promise.promisify(require('request'), { multiArgs: true });
var crypto = require('crypto');
var Sessions = require('../models/session');


exports.getUrlTitle = function(url) {
  return request(url).then(function(response, html) {
    var tag = /<title>(.*)<\/title>/;
    var match = response[0].body.match(tag);
    var title = match ? match[1] : url;
    return title;
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.hashVal = function(str) {
  const hash = crypto.createHash('sha1');
  hash.update(str);
  var hashed = hash.digest('hex');
  // console.log(hashed);
  return hashed;
};

exports.hashUser = function(user) {
  var hashedPw = exports.hashVal(user.password);
  return {
    username: user.username,
    password: hashedPw
  };
};

// exports.createCookieHash = function() {
//   var currentDate = (new Date()).valueOf().toString();
//   var random = Math.random().toString() + currentDate;
//   return crypto.createHash('sha1').update(random).digest('hex');
// };

exports.validateSession = function(session, agent) {
  console.log(session.hash, exports.hashVal(agent + session.salt));
  return session.hash === exports.hashVal(agent + session.salt);
};


exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/

