var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here
// create a new user
var createUser = function(user) {
  // add a user to database
  return db.queryAsync('INSERT into USERS SET ?', user);


};


module.exports.createUser = createUser;
