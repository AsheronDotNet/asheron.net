// app/routes

module.exports = function(router) {
    require('./atlas')(router.atlas);
    require('./main')(router.main);
};
