$(document).ready(function (){
    var topicId = Utils.params["id"];
    $.ajax({
        url: '/api/topics/' + topicId + '/posts',
        dataType: 'json'
    }).done(function (data) {
        var posts = data.posts.map(function (p) {
            return new Post(p);
        });
        $('#posts-container').append(
            Mustache.render($('#post-template').html(), {posts: posts})
        );
        $("#title").text(data.topic.title);
        $("#description").text(data.topic.description)
    }).fail(function (data) {
        alert('There was an error: ' + data.message);
    });

    $("#submit-post-form").click(function () {
        var post = {
            author: $("#post-author").val(),
            content: $("#post-content").val()
        };

        if (Utils.validatePresenceOf(post, ["author", "content"])) {
            $.ajax({
                url: '/api/topics/' + topicId +'/posts/new',
                type: "POST",
                data: JSON.stringify(post),
                success: function () {
                    post.date = new Date().toLocaleString("hu");
                    $('#posts-container').append(
                        Mustache.render($('#post-template').html(), {posts: [post]})
                    );
                    $("#post-content").val(null);
                },
                error: function () {
                    alert('Nem sikerült elmentei a hozzászólást!')
                },
            })
        } else {
            $(".error").show();
        }
    });
});

var Post = function (post) {
    $.extend(this, post);
}

Post.prototype.date = function () {
    return new Date(this.timestamp).toLocaleString("hu");
};