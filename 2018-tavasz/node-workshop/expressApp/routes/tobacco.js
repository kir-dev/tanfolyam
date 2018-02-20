var express = require('express');
var router = express.Router();
var tobaccoList = require('./../mocks/tobacco');

router.get('/', function (req, res, next) {
    res.render('pages/tobacco/tobacco', {
        tobaccos: tobaccoList
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    res.redirect('/dohany');
});

router.post('/:id/vasarlas', function (req, res, next) {
    console.log(req.params.id + '-ból vettek egyet');
    res.sendStatus(200);
});

router.get('/eladok', function(req, res, next){
    res.render('pages/tobacco/sell-page');
});

module.exports = router;