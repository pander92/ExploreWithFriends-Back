var schedule = require('node-schedule');
var game = require('./game')
var Edit = require('../controllers/editController')

var j = schedule.scheduleJob('*/10 * * * *', function () {  // ss mm hh dd mm yyyy
    console.log('Scheduling Test!');
    Edit.resetAllChallenges()
    
});
