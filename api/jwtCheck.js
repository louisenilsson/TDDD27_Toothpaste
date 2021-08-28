// Import necessary libraries (json web tokens)
var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');

// Application info from auth0.com dashboard
const authConfig = {
    domain: "lussan.eu.auth0.com",
    audience: "https://api.mysite.com"
  };


module.exports = jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
      }),
    
      audience: authConfig.audience,
      issuer: `https://${authConfig.domain}/`,
      algorithms: ["RS256"]
});
