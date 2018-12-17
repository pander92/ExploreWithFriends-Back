var express = require('express');
var router = express.Router();
var teamController = require('../controllers/teamController');
var passport = require('passport');

router.get('/getallteams', teamController.findTeams);

router.get('/getteam', function (req, res, next) {
  teamController
    .findTeam(req.query)
    .then(team => {
      res.json({
        confirmation: 'success',
        payload: team
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        payload: err
      })
    })

});



router.post('/createteam', function (req, res, next) {

  teamController
    .create(req.body)
    .then(team => {
      res.json({
        confirmation: 'success',
        payload: team
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        payload: err
      })
    })

});

router.put('/resetChallenges', function (req, res, next) {

  teamController
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

  teamController
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

router.put('/updateTeam', function (req, res, next) {

  teamController
    .updateTeam(req.body)
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
  // id: team._id
  // user: user._id
  teamController
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
  // id: team._id
  // user: user._id
  teamController
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



// router.get('/current-team', passport.authenticate('jwt', { session: false }), function (req, res) {
//     console.log(req.user)
//     res.json({
//         id: req.user.id,
//         title: req.user.title
//     })
// });

module.exports = router;
