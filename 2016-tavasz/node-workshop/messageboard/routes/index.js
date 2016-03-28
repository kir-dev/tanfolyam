var express = require('express');
var session = require('express-session');
var router = express.Router();

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('public/board.html')
});

module.exports = router;
