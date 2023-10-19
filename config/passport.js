const passport = require ('passport')
const LocalStrategy = require ('passport-local')
const User = require ('../models/User')
const bcrypt=require('bcrypt')



passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  module.exports = passport