var express = require('express');
var router = express.Router();
var editController = require('../controllers/editController');
var passport = require('passport');

router.put('/resetChallenges', function (req, res, next) {

  editController
    .resetChallenges(req.body.id)
    .then(team => {
      res.json({
        confirmation: 'success',
        team
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        err
      })
    })

});

router.put('/resetAllChallenges', function (req, res, next) {

  editController
    .resetAllChallenges()
    .then(team => {
      res.json({
        confirmation: 'success',
        team
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        err
      })
    })

});

router.put('/addUser', function (req, res, next) {
  // put request requires 2 parameters
  // team: team._id
  // user: user._id
  editController
    .addUser(req.body)
    .then(team => {
      res.json({
        confirmation: 'success',
        team
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        err
      })
    })

});

router.put('/removeUser', function (req, res, next) {
  // put request requires 2 parameters
  // team: team._id
  // user: user._id
  editController
    .removeUser(req.body)
    .then(team => {
      res.json({
        confirmation: 'success',
        team
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        err
      })
    })

});


module.exports = router;
