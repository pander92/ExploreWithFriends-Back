var User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var Team = require("../models/Team");
var game = require("../utils/game");

module.exports = {
  register: function(param) {
    return new Promise(function(resolve, reject) {
      User.findOne({ email: param.email }).then(user => {
        if (user) {
          let errors = {};
          errors.email = "Email already exists";
          errors.status = 400;
          return reject(errors);
        } else {
          const newUser = new User({
            username: param.username,
            email: param.email,
            password: param.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => resolve(user))
                .catch(err => reject(err));
            });
          });
        }
      });
    });
  },

  login: function(params) {
    const email = params.email;
    const password = params.password;
    var payload = {};

    return new Promise(function(resolve, reject) {
      User.findOne({ email })
        .populate("team")
        .then(user => {
          Team.findById(user.team)
            .populate("users")
            .then(teams => {
              if (!user) {
                let errors = {};
                errors.email = "User not found";
                errors.status = 400;
                reject(errors);
              }

              bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                  payload = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    userData: user,
                    teamData: teams
                  };
                  // console.log('-----2-----',payload);
                  // console.log(process.env.SECRET_KEY);
                  jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err) {
                        console.log(err);
                        reject(err);
                      }

                      let success = {};
                      success.confirmation = true;
                      success.token = "Bearer " + token;
                      resolve(success);
                    }
                  );
                } else {
                  let errors = {};
                  errors.password = "Password incorrect";
                  errors.status = 400;
                  reject(errors);
                }
              });
            });
        });
    });
  },
  findUsers: (req, res, next) => {
    User.find({})
      //.populate("team")
      .then(users => {
        console.log(users)
        let success = {};
        success.confirmation = true;
        success.payload = users;
        res.json(success);
      })
      .catch(err => {
        res.json(err);
      });
  },

  findUserDB: params => {
    return new Promise((resolve, reject) => {
      console.log(params);
      User.findById(params.id)
        .populate("team")
        .then(user => {
          Team.findById(user.team._id)
            .populate("users")
            .then(teams => {
              payload = {
                userData: user,
                teamData: teams
              };
              resolve(payload);
            });
        });
    });
  },

  findUser: params => {
    return new Promise((resolve, reject) => {
      User.findById(params.id)
        .populate("team")
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateUser: body => {
    return new Promise((resolve, reject) => {
      User.findById(body.id);

      User.findByIdAndUpdate(body.id, body)
        .populate("team")
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          console.log(err);
          reject(id);
        });
    });
  }
};
