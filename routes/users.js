//requireing express
const express = require('express');

//setting up router
const router = express.Router();

//calling the action 
const usersController = require('../controllers/users_controller');



//setting up the routes
router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

router.post('/create-session', usersController.createSession);

//exporting the router
module.exports = router;