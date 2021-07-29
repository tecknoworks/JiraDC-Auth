require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const routes = require('./routes/users.js');
const config = require('./config');

mongoose.connect(config.development.databaseUrl, { useNewUrlParser: true, useCreateIndex: true,})

const environment = process.env.NODE_ENV; // development
const port= 3007;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/auth', routes(router));

app.listen(`${port}`, () => {
  console.log(`auth-service now listening at localhost:${port}`);
});

module.exports = app;