const express       = require('express'),
      fs            = require('fs'),
      path          = require('path'),
      favicon       = require('serve-favicon'),
      logger        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      bodyParser    = require('body-parser'),
      indexRoute    = require('./routes/index'),
      config        = require('./config'),
      ipfilter      = require('express-ipfilter').IpFilter,
      session       = require("express-session");



// --- Initialize express --- //
const app = express();

// --- Allow only our IPs for debugging --- //
// ips = [];
// app.use(ipfilter(ips, {mode: 'allow'}));


// --- Redirect http to https --- //
app.all('*', (req, res, next) => {
	if (req.secure) {
		return next();
	}
	res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

// --- Serve public directory and make sure
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/recordrtc/'));

// --- View engine setup --- //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- Logging settings --- //
app.use(logger('common', {
    stream: fs.createWriteStream('./access-log/access.log', {flags: 'a'})
}));
app.use(logger('dev'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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

// --- Server index and experiment --- //
app.use('/', indexRoute);

// --- HTTP request error handling --- //
// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
