const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');
router.get('/', controllers.home);

router.get('/sign-up', controllers.signUp);
router.get('/sign-in', controllers.signin);
router.get('/profile', controllers.profile);
router.post('/createSession', controllers.createSession);
router.post('/createCustomer', controllers.createCustomer);
module.exports = router;