var partials = require('express').Router();

/** GET a view from the partials folder with the given name**/
partials.get('/:name', function(req, res) {
    res.render('partials/' + req.params.name);
});

module.exports = partials;
