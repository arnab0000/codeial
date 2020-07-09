const express = require('express');

//this is required for checking authentication before posting
const passport = require('passport')

const router = express.Router();

const postController = require('../controllers/post_controller');

router.post('/create', passport.checkAuthentication,postController.create);

//route for deleting post
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);


module.exports = router