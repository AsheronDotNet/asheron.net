// asheronsdb server.js

// Modules ================================================================================
var dotenv = require('dotenv').load();
var subdomain = require('express-subdomain');
var express = require('express');
// var passport = require('passport');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var app = express();


// Configuration ==========================================================================

var port = (process.env.PORT || 8080);

app.disable('x-powered-by');
//require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "100mb"}));
// app.use(methodOverride());



// Passport Configuration ================================================================
// app.use(passport.initialize());

// Routes ================================================================================
var routers = {};
routers.atlas = express.Router();
routers.main = express.Router();

require('./routes')(routers);

if (process.env.NODE_ENV == 'development') {
    app.use('/atlas', routers.atlas);
} else {
    app.use(subdomain('atlas', routers.atlas));
}

app.use('/', routers.main);

// Listen / Start App =====================================================================

app.listen(port);
console.log('Server running!');
