var express = require('express');
var app = express();
var Driver = require('./models/driver.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/api/drivers', function (req, res) {
  Driver.find(function (err, drivers) {
    if (err) return console.error(err);
    console.log(drivers);
    res.send(drivers);
  });
});
app.get('/api/drivers/:id', function (req, res) {
  Driver.findOne({_id: req.params.id}, function (err, driver) {
    if (err) return console.error(err);
    console.log(driver);
    res.send(driver);
  });
});
app.delete('/api/drivers/:id', function (req, res) {
  Driver.findOneAndRemove({_id: req.params.id}, function (err, driver) {
    if (err) return console.error(err);
    console.log(driver);
    res.send(driver);
  });
});
app.post('/api/drivers', function (req, res) {
  var newDriver = new Driver({firstName: req.body.firstName, lastName: req.body.lastName});
  newDriver.save(function (err, newDriver) {
    if (err) return console.error(err);
    res.send(newDriver._id);
  });
});
app.use(express.static('app'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webcampdarmstadt');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('MongoDB Open...');
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
});