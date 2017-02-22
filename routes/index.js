// app/routes

module.exports = function(router) {
    require('./api')(router.api);
    require('./main')(router.main);
};
