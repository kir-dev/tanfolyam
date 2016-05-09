var myModule = require('./module');

module.exports = function (req, res, next) {
    
    var date = new Date();
    var id = myModule.posts.length + 1;

    post = {
        id : id,
        name: req.body.name,
        message: req.body.message,
        date: date,
        likes: 0,
        comments: []  
    };

    myModule.posts.push(post);
    res.send(post);
};

