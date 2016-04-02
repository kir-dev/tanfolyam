var express = require('express');
var router = express.Router();

router.get('/location', function (req, res) {
	dal.Location.find(function (err, doc) {
		res.json(doc || []);
	});
});

router.get('/location/:id', function (req, res) {
	dal.Event.find({location: req.params.id}, function (err, doc) {
		res.json(doc || []);
	});
});

router.post('/login', function (req, res) {
	dal.User.findOne({username: req.body.username}, function (err, doc) {
		if(err || !doc) {
			res.json({error: "Nem létező felhasználónév"});
		} else {
			dal.User.findOne({username: req.body.username, password: req.body.password}, function (err, doc) {
				if(err || !doc) {
					res.json({error: "Hibás jelszó"});					
				} else {
					res.json({display_name: doc.display_name});
				}
			});
		}
	});
});

module.exports = router;
