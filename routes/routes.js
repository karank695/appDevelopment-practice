const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('../controllers/controller');
router.get('/', controllers.home);
router.get('/profile',passport.checkAuthentication, controllers.profile);
router.get('/sign-up', controllers.signUp);
router.get('/sign-in', controllers.signin);
router.get('/sign-out', controllers.signout);
router.post('/createSession', passport.authenticate(
    'local',{failureRedirect:'/sign-in'}
), controllers.createSession);
router.post('/createCustomer', controllers.createCustomer);
module.exports = router;