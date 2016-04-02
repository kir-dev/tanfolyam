var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    dal.Event.find().populate('location').exec(function (err, doc) {
        res.json(doc);
    })
});

module.exports = router;
