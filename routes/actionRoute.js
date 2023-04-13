const express = require('express');
const router = express.Router();
const actionController = require('../controllers/action');
router.post('/createPost', actionController.createPost);
module.exports = router;