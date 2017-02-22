// app/routes/main.js

var express = require('express');
var path = require('path');

module.exports = function (router) {

    //router.use('/bower_components', express.static(path.join(__dirname, '..', '/bower_components')));

    router.use(express.static(path.join(__dirname, '..', 'src')));

    var index = path.join(__dirname, '..', 'src', 'index.html');

    router.get('*', function (req, res) {
        res.sendFile(index);
    });



};
