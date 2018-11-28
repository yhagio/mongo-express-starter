const express = require('express');

const router = require('./api/router');
const { signin } = require('./api/modules/auth');
const setupMiddware = require('./middleware');
const connect = require('./db');

// Declare an app from express
const app = express();

setupMiddware(app);
connect();
// setup basic routing for index route

app.use('/signin', signin);
app.use('/api', router);

// catch all
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Not Found.' });
});

module.exports = app;
