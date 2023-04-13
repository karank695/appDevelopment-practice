const passport = require('passport');
const Customer = require('../models/customer');
//controller for homepage
module.exports.home = (req, res) => {
    return res.render('home');
}
//controller for signup page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
         return res.redirect('/profile')
    }
    return res.render('sign-up');
   
}
module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    return res.render('sign-in');
}
module.exports.profile = (req, res) => {
    return res.render('profile');
}
module.exports.createCustomer = (req, res) => {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    Customer.findOne({ customer_email: req.body.email })
        .then((user) => {
            if (user) {
                return res.redirect('/sign-in');
            } else {
                console.log(req.body);
                Customer.create({
                    customer_name: req.body.customerName,
                    customer_email: req.body.email,
                    customer_phone: req.body.phoneNumber,
                    customer_password:req.body.password
                }).then((data) => {
                    console.log(data);
                    return res.redirect('/sign-in');
                }).catch((err) => {
                    console.log(err);
                })
                
            }
        })
        .catch((err) => {
            console.log('error in getting data');
        })

}
module.exports.createSession = (req, res) => {
    return res.redirect('/profile');
}
module.exports.signout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
        }
         return res.redirect('/sign-up');
    });
   
}
