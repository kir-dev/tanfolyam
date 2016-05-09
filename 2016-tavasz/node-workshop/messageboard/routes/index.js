var express = require('express');
var session = require('express-session');
var router = express.Router();

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

var listPosts = require('../middleware/listPosts');
var addPost = require('../middleware/addPost');
var likePost = require('../middleware/likePost');
var commentOnPost = require('../middleware/commentOnPost');
var deletePost = require('../middleware/deletePost');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username != null){
    res.reneder('index.html');
  }else{
    res.redirect('/login');
  }
});


router.get('/board', listPosts);

router.post('/board/add', addPost);

router.post('/board/like', likePost);

router.post('/board/comment', commentOnPost);

router.delete('/board/delete/:postId', deletePost);

router.post('/login', function (req,res,next) {
  req.session.username=req.body.username;
  res.redirect('/');
});

router.use('/logout', function (req,res,next) {
  req.session.username=null;
  res.end();
});

router.get('/who',  function (req,res,next) {
  res.send(req.session.username);
});

module.exports = router;
