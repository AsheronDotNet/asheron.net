// app/routes/api

module.exports = function(router) {

    require('./servers')(router);


    // require('./auth')(router, passport);

    // require('./users')(router);
    //
    // router.all('*', function(req, res, next) {
    //     passport.authenticate('bearer', function(err, user, info) {
    //         if (err) return next(err);
    //         if (user) {
    //             req.user = user;
    //             return next();
    //         } else {
    //             return res.status(401).json({
    //                 status: 'error',
    //                 code: 'unauthorized'
    //             });
    //         }
    //     })(req, res, next);
    // });
    //


    //require('./authors')(router);

};
