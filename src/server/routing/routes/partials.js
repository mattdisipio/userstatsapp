var partials = require('express').Router();

partials.get('/:name', function(req, res) {
    res.render('partials/' + req.params.name);
});

module.exports = partials;
