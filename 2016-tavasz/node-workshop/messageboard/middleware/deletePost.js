var myModule = require('./module');

module.exports = function (req, res, next) {
    var postId = req.params.postId;

    var posts = myModule.posts;
    for(i=posts.length-1; i >= 0; i--){
        if(posts[i].id == postId){
            posts.splice(i,1);
        }
    }

    res.send('Deleted post:' + postId);
};

