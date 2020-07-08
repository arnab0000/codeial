const express = require('express');

//this is required for checking authentication before posting
const passport = require('passport')

const router = express.Router();

const postController = require('../controllers/post_controller');

router.post('/create', passport.checkAuthentication,postController.create);

module.exports = router