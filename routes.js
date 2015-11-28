var Driver = require('./controllers/driver.js');
module.exports = function (app) {
  app.get('/api/drivers', Driver.getAll);
  app.get('/api/drivers/:id', Driver.get);
  app.put('/api/drivers/:id', Driver.change);
  app.delete('/api/drivers/:id', Driver.delete);
  app.post('/api/drivers', Driver.createNew);
};