var mongoose = require('mongoose');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var builder = require('xmlbuilder');

// Load models
var Server = require('../../models/Server');

module.exports = function(router) {

    // app.use('*.xml', function() {
    //     res.set('Content-Type', 'text/xml');
    //     next();
    // });

    // Get quotes
    router.get('/servers\.:ext?', async(function(req, res) {

        var resultObj = {
            "status": "",
            "code": 0,
            "messages": [],
            "result": null
        }

        //console.log(req.params.ext);




        var sortBy = req.query.sortBy ? req.query.sortBy : "order";
        var sortOptions = {};
        sortOptions[sortBy] = req.query.sort == "desc" ? "desc" : "asc";

        var query = Server
            .find()
            .skip((req.query.offset ? req.query.offset : 0))
            .limit((req.query.limit ? req.query.limit : 200))
            .sort(sortOptions);

        var results = await (query.exec());

        if (results.length !== 0) {

            if (!req.params.ext || req.params.ext == 'json') {

                resultObj.status = "ok";
                resultObj.code = 200;
                resultObj.result = results;
                res.status(resultObj.code).send(resultObj);

            } else if (req.params.ext == 'xml') {


                //console.log(results);


                //   .ele('xmlbuilder')
                //     .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
                //   .end({ pretty: true});

                // root: {
                //     xmlbuilder: {
                //       repo: {
                //         '@type': 'git', // attributes start with @
                //         '#text': 'git://github.com/oozcitak/xmlbuilder-js.git' // text node
                //       }
                //     }
                //   }
                // }
                //


                var xml = builder.create('ArrayOfServerItem');


                results.forEach(function(server) {
                    var obj = {
                        ServerItem: {
                            id: server.id,
                            name: server.name,
                            description: server.description,
                            address: server.address,
                            trackerAddress: server.trackerAddress,
                            port: server.port,
                            customCredentials: server.customCredentials,
                            enableLogin: server.enableLogin,
                            defaultUsername: server.defaultUsername,
                            defaultPassword: server.defaultPassword,
                            shortName: server.shortName,
                            decalEnabled: server.decalEnabled,
                            multiClientEnabled: server.multiClientEnabled,
                            online: server.online,
                            playersOnline: server.playersOnline,
                            emulator: {
                                name: server.emulator.name,
                                version: server.emulator.version,
                                repo: server.emulator.repo
                            }
                        }
                    };



                    xml.ele(obj);



                });






                var finishedXML = xml.doc().end({
                    pretty: true
                })

                console.log(xml);

                res.set('Content-Type', 'text/xml');
                res.status(200).send(finishedXML);

            } else {

                resultObj.status = "error";
                resultObj.code = 406;
                res.status(resultObj.code).send(resultObj);

            }

        } else {
            resultObj.status = "error";
            resultObj.code = 204;
            resultObj.messages.push('No Content');
            res.status(resultObj.code).send(resultObj);
        }

        //res.status(400).send('Bad Request');

    }));

    // Submit a quote
    // router.post('/servers', function(req, res) {
    //
    //     console.log(req.body);
    //     Quote.create(req.body, function(err, data) {
    //
    //         if (err) {
    //             return res.send(err);
    //         }
    //         res.status(201).send('Created');
    //     });
    // });

    // Get single server
    router.get('/servers/:id', function(req, res) {
        return Server.findById(req.params.id, function(err, server) {
            if (!err) {
                var response;
                if (server) {
                    response = res.status(200).send(server);
                } else {
                    response = res.status(204).send('No Content');
                }
            } else {
                return res.status(400).send('Bad Request');
            }
        });
    });

    // Updates a server
    router.put('/servers/:id', function(req, res, next) {

        console.log(req.body);
        if (req.body.api_key == process.env.API_SECRET_TEMP) {

            Server.findOneAndUpdate({
                _id: req.params.id
            }, {
                online: req.body.online
            }, {
                upsert: true
            }, function(err, doc) {
                if (err) return res.send(500, {
                    error: err
                });
                return res.status(200).send("succesfully saved");
            });

        } else {

            res.status(403).end();

        }



        // Server.findOneAndUpdate(query, req.newData, {
        //     upsert: true
        // }, function(err, doc) {
        //     if (err) return res.send(500, {
        //         error: err
        //     });
        //     return res.send("succesfully saved");
        // });
        //
        //
        // return Server.findById(req.params.id, function(err, server) {
        //     if (!err) {
        //         var response;
        //         if (server) {
        //             //response = res.status(200).send(server);
        //
        //             tank.size = 'large';
        //             server.save(function(err, updatedServer) {
        //                 if (err) return handleError(err);
        //                 res.status(200).end();
        //             });
        //
        //
        //         } else {
        //             //response = res.status(204).send('No Content');
        //         }
        //     } else {
        //         return res.status(400).send('Bad Request');
        //     }
        // });
    });

    // Deletes a quote
    router.delete('/servers/:id', function(req, res, next) {

    });

    // API root

    router.get('/', function(req, res) {
        res.status(403).send('Forbidden');
    });

};
