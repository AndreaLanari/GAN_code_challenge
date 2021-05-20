
const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/main.controller');


router.get('/cities-by-tag',passport.authenticate('bearer',{ session: false }), controller.cityByTag );
router.get('/distance', passport.authenticate('bearer',{ session: false }), controller.citiesDistance );
router.get('/area', passport.authenticate('bearer',{ session: false }), controller.areaPool); 
router.get('/area-result/2152f96f-50c7-4d76-9e18-f7033bd14428',passport.authenticate('bearer',{ session: false }),controller.areaDistance)
router.get('/all-cities',passport.authenticate('bearer',{ session: false }), controller.getAllCities);

module.exports = router