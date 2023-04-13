const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Customer=require('../models/customer')
passport.use(new LocalStrategy(
    {usernameField:'email'},
    function (email, password, done) {
        Customer.findOne({ email:email })
            .then((user) => {
                if (!user || user.password!=password) {
                    return done(null, false);
                }
                return done(null, user);
                
            })
            .catch((err) => {
                console.log("finding error in fetching data");
                return done(err);
            });
}
));
//serializing the customer to set cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    Customer.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        return done(err);
    });
})

passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;


