const passport = require('passport')
const assert = require('assert')
const fs = require('fs-extra')
const BearerStrategy = require('passport-http-bearer').Strategy;

// Strategy for out passport-http-bearer
passport.use(new BearerStrategy(
    function(token, done) {
        try {
            let rawdata = fs.readFileSync(global.appRoot + '/data/users.json');
            let user = JSON.parse(rawdata);
            assert.strictEqual(user.Authorization, token)
            done(null,true)
          }
          catch(err){
              console.log(err)
            return done(null, false);
          }
    }));

   module.exports = passport