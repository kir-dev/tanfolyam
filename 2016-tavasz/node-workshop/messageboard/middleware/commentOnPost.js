var myModule = require('./module');
var bodyParser = require('body-parser');

module.exports = function (req, res, next) {
    var postId = req.body.postId;
    var posts = myModule.posts;
    for(i=0; i < posts.length; i++){
        console.log(posts[i].name);
        if(posts[i].id == postId){
            posts[i].comments.push(req.body.comment);    
        }   
    }
    res.end();
};

