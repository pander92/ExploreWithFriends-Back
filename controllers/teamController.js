var User = require('../models/User');
var Team = require('../models/Team');
var game = require('../utils/game');
const jwt = require('jsonwebtoken');


module.exports = {

  findTeams: (req, res, next) => {

    Team.find({})
      .populate('users')
      .then(teams => {
        let success = {}
        success.confirmation = true;
        success.payload = teams;

        res.json(success);
      })
      .catch(err => {
        res.json(err);
      })

  },
  findTeam: (params) => {

    return new Promise((resolve, reject) => {
      Team.findById(params.id)
        .populate('users')
        .then(teams => {
          resolve(teams);
        })
        .catch(err => {
          reject(err);
        })
    });
  },
  create: (params) => {

    return new Promise((resolve, reject) => {
      Team.create(params)
        .then(team => {
          resolve(team);
        })
         .catch(err => {
        reject(err);
      });
  });
},

  updateTeam: (body) => {

    return new Promise((resolve, reject) => {
      Team.findById(body.id)
        .populate('users')
        .then(foundTeam => {
          let currentTeam = foundTeam
          console.log('----1----', currentTeam);
          
          for (const key in body) {
            // console.log("KEY: ", key);
            // console.log('currentTeam[key]: ', currentTeam[key]); 
            
            // console.log('body[key]: ', body[key]);

            // console.log('currentTeam.challenge1.complete: ', currentTeam.challenge1.complete);
            // console.log('---------------');
            
            if(key.includes('.')) {
              console.log("! . !");
              let keyArray = key.split('.')
              // console.log(keyArray);
              // console.log('currentTeam.keyArray[0].keyArray[1]: ', currentTeam[keyArray[0]][keyArray[1]]);
              currentTeam[keyArray[0]][keyArray[1]] = body[key]
            } else {
              currentTeam[key] = body[key]
            }
          }
          console.log('----2----', currentTeam);
          Team.findByIdAndUpdate(body.id, currentTeam, {new: true, overwrite: false})
            .populate('users')
            .then(team => {
              resolve(team)
            })
            .catch(err => {
              console.log(err)
              reject(id)
            })

        })
        .catch(err => {
          reject(err);
        })

    })
  }
}