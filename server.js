// asheronsdb server.js

// Modules ================================================================================
var dotenv = require('dotenv').load();
var subdomain = require('express-subdomain');
var express = require('express');
// var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var app = express();


// Configuration ==========================================================================

var port = (process.env.PORT || 8080);

app.disable('x-powered-by');

var database = require('./config/database');
mongoose.connect(database.url);
//
//require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "100mb"}));
// app.use(methodOverride());



// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});



// Passport Configuration ================================================================
// app.use(passport.initialize());

// Routes ================================================================================
var routers = {};
routers.api = express.Router();
routers.main = express.Router();

require('./routes')(routers);

if (process.env.NODE_ENV == 'development') {
    app.use('/api', routers.api);
} else {
    app.use(subdomain('api', routers.api));
}

app.use('/', routers.main);

// Listen / Start App =====================================================================

app.listen(port);
console.log('Server running!');
