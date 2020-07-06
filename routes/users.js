//requireing express
const express = require('express');

//setting up router
const router = express.Router();

//calling the action 
const usersController = require('../controllers/users_controller');
const passport = require('passport');



//setting up the routes
router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

router.post('/create-session', passport.authenticate('local', {failureRedirect: '/user/sign-in'}), usersController.createSession)

router.get('/sign-out', usersController.destroySession);

//exporting the router
module.exports = router;