const Customer = require('../models/customer');
//controller for homepage
module.exports.home = (req, res) => {
    res.render('home');
}
//controller for signup page
module.exports.signUp = (req, res) => {
    if (req.cookies.user_id) {
        return res.redirect('/profile');
    }
    return res.render('sign-up');
}
module.exports.signin = (req, res) => {
    if (req.cookies.user_id) {
        return res.redirect('/profile');
    }
    return res.render('sign-in');
}
module.exports.profile = (req, res) => {
    if (req.cookies.user_id) {
        Customer.findOne({ _id: req.cookies.user_id })
            .then((data) => {
                console.log(data);
                return res.render('profile', { user: data });
            })
            .catch((err) => {
                console.log(err);
        })
    }
}
module.exports.createCustomer = (req, res) => {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    Customer.findOne({
            customer_email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.redirect('/sign-in');
            } else {
                Customer.create({
                    customer_name: req.body.customerName,
                    customer_email: req.body.email,
                    customer_phone: req.body.phoneNumber,
                    customer_password: req.body.password
                }).then((data) => {
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
    Customer.findOne({
            customer_email: req.body.email
        })
        .then((user) => {
            if (user) {
                if (user.customer_password != req.body.password) {
                    return res.redirect('back');
                } else {
                    res.cookie('user_id', user.id);
                    return res.redirect('/profile');
                }
            } else {
                res.redirect('/sign-up');
            }

        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports.signout = (req, res) => {
    res.clearCookie('user_id');
   return res.redirect('/sign-in');
}