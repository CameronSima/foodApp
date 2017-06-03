var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Pickup = require('../models/Pickups');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// donor creates new pickup
router.post('newPickup', function(req, res, next) {
  Pickup.create(req.body, function(err, pickup) {
    if (err) {
      console.log(err);
    }
    res.json(pickup);
  });
});

// volunteer looks for open pickups
router.get('pickups', function(req, res, next) {
  Pickup.find()
    .populate('donor')
    .sort('date')
    .exec(function(err, pickups) {
      if (err) {
        console.log(err);
      }
      var openPickups = pickups.filter(function(pickup) {
        return pickup.status == "accepted";
      })
      res.json(openPickups);
    })
})

//volunteer responds to pickup
router.post('pickups/:id', function(req, res, next) {
  Pickup.findByIdAndUpdate(req.params.id, req.body)
  .exec(function(err, pickup) {
    if (err) {
      console.log(err);
    }
    res.json(pickup)
  })
})

//donor polls this api to get updates on their pickup request
router.get('/pickupStatus:id', function(req, res, next) {
  Pickup.find({_id: req.params.id})
  .populate('volunteer')
  .exec(function(err, pickup) {
    if (err) {
      console.log(err);
    }
    if (pickup.status == "accepted") {
      pickup.message = "Your pickup request has been accepted by " +
                       pickup.volunteer.name + "! You can reach " +
                       pickup.volunteer.name + " at " + pickup.volunteer.phone + "."
      res.json(pickup);
    } else {
      next();
    }
  });
});

module.exports = router;


