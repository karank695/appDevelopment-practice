const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 5000;
const ejs = require('ejs');
const db = require('./config/connection');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('assets'));
//using the body parser
app.use(express.urlencoded({ extended: true }));
//cookie parser
app.use(cookieParser());
app.use(session({
    name: 'codial',
    //Todo change the secret before deployment
    secret: 'balhsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedCustomer);
//requiring routes
app.use('/', require('./routes/routes'));


app.listen(5000, () => {
    console.log(`I am listening at port ${port}`);
})
