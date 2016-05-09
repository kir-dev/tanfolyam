var myModule = require('./module');

module.exports = function (req, res, next) {
    posts = myModule.posts;
    res.send(posts);
};

