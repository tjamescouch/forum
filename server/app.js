const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const passport = require("passport");

const controllers = require('./controllers');
const configurePassport = require("./config/passport");

function setupApp(app) {
  //Setup middleware
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());
  configurePassport(passport);

  app.use('/api', controllers);

}

module.exports = setupApp;
