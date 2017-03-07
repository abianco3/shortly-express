var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {

  if (!req.cookies.shortlyCookie) {

    var hash = util.createCookieHash();
    req.session = {shortlyCookie: hash};
    res.cookie('shortlyCookie', hash);
    Sessions.createSession(hash);
    next();
  }

  if (req.cookies.shortlyCookie) {
    var session = Session.findSession(req.cookies.shortlyCookie);
    session.then(function(session) {
      res.session = session;
    })
    .error(function(err) {
      console.error(err);
    });
  }

};


module.exports = createSession;
