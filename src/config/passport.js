const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const User=require('../models/User');

passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=> {
   const user = await User.findOne({email});
    if (!user) {
        return done(null, false);
    } else {
       const match= await user.matchPassword(password);
       if (match) {
           return done(null, user);
       } else {
           return done(null, false);
       }
    }
}));


/*passport.use(new LocalStrategy(
    function(email, password, done) {
        User.findOne({password: password}, function(err, user) {
            if (err) {return done(err);}
            if (!user) {return done(null,false);}
            if (!user.matchPassword(password)) {return done(null,false);}
            return done(null,user);
        });
    }
));
*/
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err,user);
    });
})