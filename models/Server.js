// app/models/Servers.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    address: String,
    trackerAddress: String,
    port: String,
    name: String,
    description: String,
    customCredentials: Boolean,
    defaultUsername: String,
    defaultPassword: String,
    shortName: String,
    enableLogin: Boolean,
    decalEnabled: Boolean,
    multiClientEnabled: Boolean,
    playersOnline: Number,
    online: Boolean,
    emulator: {
        name: String,
        version: String,
        repo: String
    }
});


schema.set('toJSON', {
    transform: function (doc, ret, options) {
        var retJson = ret;
        retJson.id = ret._id;
        delete retJson._id;
        delete retJson.__v;
        return retJson;
    }
});

module.exports = mongoose.model('Server', schema);
