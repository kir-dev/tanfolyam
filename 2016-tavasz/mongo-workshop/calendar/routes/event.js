var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    dal.Event.find().populate('location').exec(function (err, doc) {
        res.json(doc);
    });
});

function saveEvent (req, res) {
    var start = new Date(req.body.start);
    var end = new Date(req.body.end);
    var newEvent = {title: req.body.title, start: start, end: end};
    if (req.body.location) {
        newEvent.location = req.body.location;
    }
    if(start.getTime() < end.getTime()) {
        if(req.params.id) {
            dal.Event.findOneAndUpdate({_id: req.params.id}, newEvent, function (err, doc) {
                res.end();
            });
        } else {
            new dal.Event(newEvent).save(function (err, doc) {
                res.end();
            });
        }
    } else {
        res.json({error: "A kezdés később van, mint a befejezés"});
    }
}

function upsertEvent (req, res) {
    if(req.body.location) {
        dal.Location.findOne({_id: req.body.location}, function (err, doc) {
            if(err || !doc) {
                res.json({error: "Nem létezik ilyen helyszín"});
            } else {
                saveEvent(req, res);
            }
        });
    } else {
        saveEvent(req, res);
    }
}

router.post('/create', upsertEvent);

router.post('/update/:id', function (req, res) {
    dal.Event.findOne({_id: req.params.id}, function (err, doc) {
        if(!doc) {
            res.json({error: "Nem létező ID"});
        } else {
            upsertEvent(req, res);
        }
    });
});


module.exports = router;
