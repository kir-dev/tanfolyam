var express = require('express');
var router = express.Router();
var coalList = require('./../mocks/coal');

router.get('/', function (req, res, next) {
    res.render('pages/coal/coal', {
        coals: coalList
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    res.redirect('/szen');
});

router.post('/:id/vasarlas', function (req, res, next) {
    console.log(req.params.id + '-ból vettek egyet');
    res.sendStatus(200);
});

router.get('/eladok', function(req, res, next){
    res.render('pages/coal/sell-page');
});

module.exports = router;