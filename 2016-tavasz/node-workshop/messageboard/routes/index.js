var express = require('express');
var router = express.Router();

var listPosts = require('../middleware/listPosts');
var addPost = require('../middleware/addPost');
var likePost = require('../middleware/likePost');
var commentOnPost = require('../middleware/commentOnPost');
var deletePost = require('../middleware/deletePost');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/board', listPosts);

router.post('/board/add', addPost);

router.post('/board/like', likePost);

router.post('/board/comment', commentOnPost);

router.delete('/board/delete/:postId', deletePost);


module.exports = router;
