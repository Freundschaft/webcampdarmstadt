var mongoose = require('mongoose');

var driverSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  routes: []
});

var Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;