var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('app'));
var mongoose = require('mongoose');
var cors = require('cors');
var mongodbConnection = 'mongodb://webcamper:webcamp0r@ds048537.mongolab.com:48537/workshoptest';
mongoose.connect(mongodbConnection);
app.use(cors());
var routes = require('./routes.js')(app);
var db = mongoose.connection;
var port = process.env.port || 3000;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('MongoDB Open...');
  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
});