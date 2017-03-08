var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here
// create a new user
var createUser = function(user) {
  // add a user to database

  var hashedPw = utils.hashVal(user.password);
  var userObj = {
    username: user.username,
    password: hashedPw,
  };

  return db.queryAsync('INSERT into USERS SET ?', userObj);

};

var loginUser = function(user) {
  
  var userObj = utils.hashUser(user);
  // console.log(user);
  return db.queryAsync('SELECT * FROM users WHERE username=(?) AND password=(?)', [userObj.username, userObj.password, userObj.salt]);
};


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
