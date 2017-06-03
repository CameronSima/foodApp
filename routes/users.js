var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/signup', function(req, res, next) {
//   User.find(function(err, ))
// })

router.get('/pickups', function(req, res, next) {
  
})

module.exports = router;
