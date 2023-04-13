const Customer = require('../models/customer');
const Post = require('../models/post');
module.exports.profile = (req, res) => {
    Post.find().populate('user_id').then((data) => {
        console.log(data);
        return res.render('profile', { posts: data });
    }).catch((err) => { console.log(err) });
     
}
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

module.exports.createCustomer = (req, res) => {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    Customer.find({ email: req.body.email })
        .then((customer) => {
          if (customer.length > 0) {
              return res.redirect('/signin');

          } else {
                Customer.create({
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phoneNumber,
                    password:req.body.password
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
    return res.redirect('/profile');
}
module.exports.signout = (req, res) => {
 
             res.clearCookie('codial');
             res.redirect('/sign-in');
    
   
}
