var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session  = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');


var config = require('./config/config');
var handler = require('./helper/response');

var app = express();

mongoose.connect(config.database.address);
var db = mongoose.connection;
db.on('error', function(error){
  console.log("database not connected ",error);
});
db.once('open', function() {
  console.log("Database connected");
});

require('./config/passport')(passport);
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'keyboard cat'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
//routes
require('./routes/passport')(app, passport);
require('./routes')(app);
// uncaughtException handler
process.on('uncaughtException', function (err) {
  console.log("uncaughtException",err);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.json(handler.handleError(404, "Not Found"));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.json(handler.handleError(404, "Not Found"));
});


module.exports = app;
