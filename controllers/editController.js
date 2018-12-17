var User = require('../models/User');
var Team = require('../models/Team');
var game = require('../utils/game');

const jwt = require('jsonwebtoken');


module.exports = {

  addUser: (params) => {

     return new Promise((resolve, reject) => {
      Team.findById(params.team)
        .populate('users')
        .then(foundTeam => {

          let currentTeam = {}
          currentUsers = foundTeam.users
          currentUsers.push(params.user)
          currentTeam.users = currentUsers

          Team.findByIdAndUpdate(params.team, currentTeam)
            .populate('users')
            .then(team => {
              resolve(team)
            })
            .catch(err => {
              console.log(err)
              reject(id)
            })
            return params
        })
        .then(params => {
         User.findById(params.user)
           .populate('team')
           .then(foundUser => {

             let newTeam = {}
             newTeam.team = params.team

             User.findByIdAndUpdate(params.user, newTeam)
               .populate('team')
               .then(user => {
                 resolve(user);
               })
               .catch(err => {
                 console.log(err);
                 reject(id);
               });
           })
          })
        .catch(err => {
          reject(err);
        })
    })
  },
  removeUser: (params) => {

    return new Promise((resolve, reject) => {
      Team.findById(params.team)
        .populate('users')
        .then(foundTeam => {
          console.log(foundTeam);
          
          let currentTeam = {}
          currentUsers = foundTeam.users
          console.log('----currentUsers----');
          
          console.log(currentUsers);
          
          let indx = currentUsers.findIndex(e => e._id == params.user)
          console.log('-----indx------');
          console.log(indx);
          
          if (indx >= 0 ){
            currentUsers.splice(indx)
          }
          currentTeam.users = currentUsers

          Team.findByIdAndUpdate(params.team, currentTeam)
            .populate('users')
            .then(team => {
              resolve(team)
            })
            .catch(err => {
              console.log(err)
              reject(id)
            })
           return params
        })
        .then(params => {
         User.findById(params.user)
           .populate('team')
           .then(foundUser => {

             let delTeam = {}
             delTeam.team = null

             User.findByIdAndUpdate(params.user, delTeam)
               .populate('team')
               .then(user => {
                 resolve(user);
               })
               .catch(err => {
                 console.log(err);
                 reject(id);
               });
           })
        })
        .catch(err => {
          reject(err);
        })

    })
  },

  resetChallenges: (id) => {

      return new Promise((resolve, reject) => {

        Team.findById(id)
          .then(foundTeam => {

            let currentTeam = {}
            let returnChallengeArray = game.generateChallenge();

            currentTeam.challenge1 = returnChallengeArray[0];
            currentTeam.challenge1.complete = false;
            currentTeam.challenge2 = returnChallengeArray[1];
            currentTeam.challenge2.complete = false;
            currentTeam.challenge3 = returnChallengeArray[2];
            currentTeam.challenge3.complete = false;

           // currentTeam.challenge = [false, false, false]

            Team.findByIdAndUpdate(foundTeam._id, currentTeam)
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

      });
    },
    resetAllChallenges: () => {

      return new Promise((resolve, reject) => {

        Team.find({})
          .then(teams => {
            let ids = teams.map(e => e._id);
            ids.forEach((e) => {

              Team.findById(e)
                .then(foundTeam => {

                  let currentTeam = {}

                  let returnChallengeArray = game.generateChallenge();

                  currentTeam.challenge1 = returnChallengeArray[0];
                  currentTeam.challenge1.complete = false;
                  currentTeam.challenge2 = returnChallengeArray[1];
                  currentTeam.challenge2.complete = false;
                  currentTeam.challenge3 = returnChallengeArray[2];
                  currentTeam.challenge3.complete = false;

                 // currentTeam.challenge = [false, false, false]

                  Team.findByIdAndUpdate(foundTeam._id, currentTeam)
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
          });
      })
    },
}