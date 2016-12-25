var indexRoute = rootRequire('routing/routes/index');
var partialsRoute = rootRequire('routing/routes/partials');

/* Handles all routing for the application 
 * @param (app) the Express application instance */
module.exports = function(app) {
    app.use('/partials', partialsRoute);
    
    app.use('*', indexRoute);
};
