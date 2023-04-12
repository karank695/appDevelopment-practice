const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 5000;
const ejs = require('ejs');
const db = require('./config/connection');
//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('assets'));
//using the body parser
app.use(express.urlencoded({ extended: true }));
//requiring routes
app.use('/', require('./routes/routes'));


app.listen(5000, () => {
    console.log(`I am listening at port ${port}`);
})
