
const express       = require('express'),
      path          = require('path'),
      favicon       = require('serve-favicon'),
      logger        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      bodyParser    = require('body-parser'),
      fse           = require("fs-extra"),
      https         = require("https"),
      multer        = require("multer"),
      upload        = multer(),
      session       = require("express-session"),
      {mongoose}    = require("./db/mongoose-config");


// --- Import experiment route --- //
const index = require('./routes/index');

// --- Initialize express --- //
const app = express();

// --- Serve public directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// ---- Set up body parser so that audio files can also be read --- //
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());

// --- Add session middleware --- //
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.SECRET,
  name: config.SESSION,
  saveUninitialized: false,
  resave: false
}));
// --- Disable caching of page --- //
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use('/', index);

// --- HTTP request error handling --- //
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
