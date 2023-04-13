const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Customer=require('../models/customer')
passport.use(new LocalStrategy(
    {usernameField:'email'},
    function (email, password, done) {
        Customer.findOne({ customer_email: email })
            .then((customer) => {
                if (!customer || password != customer.customer_password) {
                    return done(null, false);
                }
                return done(null, customer);
            })
            .catch((err) => {
                console.log("finding error in fetching data");
                done(err);
            });
}
));
//serializing the customer to set cookie
passport.serializeUser(function (customer, done) {
    done(null, customer.id);
})

passport.deserializeUser(function (id, done) {
    Customer.findById(id).then((customer) => {
        return done(null, customer);
    }).catch((err) => {
        return done(err);
    });
})

passport.checkAuthentication = (req, res,next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/sign-in');
}

passport.setAuthenticatedCustomer = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.customer = req.customer;
    }
    next();
}
module.exports = passport;

