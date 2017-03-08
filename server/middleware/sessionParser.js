var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {

  if (!req.cookies.shortlyid) {

    // var hash = util.createCookieHash();
    // req.session = {hash: hash};
    // res.cookie('shortlyid', hash);
    
    return Sessions.createSession(req.header('User-Agent'), Date.now().toString())
    .then(function(hash) {
      req.session = {hash: hash};
      res.cookie('shortlyid', hash);
      next();
    });
  }

  // find the session object
  Sessions.findSession(req.cookies.shortlyid)
  .then(function(result) {
    // if no session for this cookie
    var session = result[0][0];
    
    if (!session) {
      // delete the cookie
      res.clearCookie('shortlyid');
      return next();
    }
    // validate the cookie
    
    if (!util.validateSession(session, req.get('User-Agent'))) {
      // if invalid destroy session
      return Sessions.deleteSession(req.cookies.shortlyid)
      .then(function() {
        next();
      });
    }
    // if valid set session property on request
    req.session = session;
    return next();
  
  });
};


module.exports = createSession;
