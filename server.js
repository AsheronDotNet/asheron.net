// asheronsdb server.js

// Modules ================================================================================
var dotenv = require('dotenv').load();
var subdomain = require('express-subdomain');
var express = require('express');
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "100mb"}));
// app.use(methodOverride());


// Routes ================================================================================
var routers = {};
routers.atlas = express.Router();
routers.main = express.Router();

require('./routes')(routers);

app.use('/atlas', routers.atlas);
app.use('/', routers.main);

// Listen / Start App =====================================================================

app.listen(port);
console.log('Server running! Listening on port ' + port);
