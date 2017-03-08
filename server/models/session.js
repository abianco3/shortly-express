var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here
var findSession = function(hash) {
  return db.queryAsync('SELECT * FROM sessions where hash=?', [hash]);
};
var createSession = function(seed, salt) {
  var hash = util.hashVal(seed + salt);
  console.log(salt);
  return db.queryAsync('INSERT into sessions (hash, salt) values (?, ?)', [hash, salt]).return(hash);
};
var deleteSession = function(hash) {
  return db.queryAsync('DELETE FROM sessions where hash=?', [hash]);
};
var updateSession = function(session, user) {
  return db.queryAsync('UPDATE sessions SET user.id=? where hash=?', [user.id, session.hash]);
};

module.exports.findSession = findSession;
module.exports.createSession = createSession;
module.exports.deleteSession = deleteSession;
module.exports.updateSession = updateSession;
