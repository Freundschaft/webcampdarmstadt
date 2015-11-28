var Driver = require('../models/driver.js');

module.exports = {
  createNew: function (req, res) {
    var newDriver = new Driver({firstName: req.body.firstName, lastName: req.body.lastName});
    newDriver.save(function (err, newDriver) {
      if (err) return console.error(err);
      res.send(newDriver._id);
    });
  },
  delete: function (req, res) {
    Driver.findOneAndRemove({_id: req.params.id}, function (err, driver) {
      if (err) return console.error(err);
      console.log(driver);
      res.send(driver);
    });
  },
  get: function (req, res) {
    Driver.findOne({_id: req.params.id}, function (err, driver) {
      if (err) return console.error(err);
      console.log(driver);
      res.send(driver);
    });
  },
  getAll: function (req, res) {
    Driver.find(function (err, drivers) {
      if (err) return console.error(err);
      console.log(drivers);
      res.send(drivers);
    });
  }
};