var parseCookies = function(req, res, next) {
  // retrieve the cookies from the request headers
  var cookieObj = {};
  var cookies = req.header('cookie');
  
  if (cookies) {

    var cookieArr = cookies.split('; ').map(function(cookie) {
      return cookie.split('=');
    });


    cookieArr.forEach(function(cookieTuple) {
      // assign the cookies to key:value pairs on cookieObj
      cookieObj[cookieTuple[0]] = cookieTuple[1];
    });
    
    
  }
  
  req.cookies = cookieObj;
  next();

};

module.exports = parseCookies;