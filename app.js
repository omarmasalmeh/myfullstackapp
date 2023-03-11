//import node packages 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

//load any enviorment variables form .env file
require('dotenv').config()

//connect to our mongodb
console.log(`MONGO_DB: ${process.env.MONGO_DB}`);
mongoose.connect(process.env.MONGO_DB);

var indexRouter = require('./routes/index'); //index = index.js
var apiRouter = require('./routes/api/api');  //api = api folder

//create an instenece of our express app
var app = express();

// view engine setup for serving html pages - we won't use it
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

//use routers for specifeied url paths
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
