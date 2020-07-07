const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home)

router.use('/user', require('./users'))

router.use('/post', require('./post'))

//for any further routes, access from here
//router.use('/routerName', require('./routerFile'));

console.log("Router Loaded")


module.exports = router