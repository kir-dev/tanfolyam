$(document).ready(function (){
    var topicId = Utils.params["id"];
    $.ajax({
        url: '/api/topics/' + topicId + '/posts',
        dataType: 'json'
    }).done(function (data) {
        // minden posthoz létrehozunk egy burkolót
        // ami többek között a dátumformázásért is felel
        var posts = data.posts.map(function (p) {
            return new Post(p);
        });
        $('#posts-container').append(
            Mustache.render($('#post-template').html(), {posts: posts})
        );

        // téma cím és leírás beállítása
        $("#title").text(data.topic.title);
        $("#description").text(data.topic.description)
    }).fail(function (data) {
        alert('There was an error: ' + data.message);
    });

    $("#submit-post-form").click(function () {
        var button = $(this),
            post = {
            author: $("#post-author").val(),
            content: $("#post-content").val()
        };

        // a mentés idejére letiltjuk a gombot
        button.attr('disabled', 'disabled');
        if (Utils.validatePresenceOf(post, ["author", "content"])) {
            $.ajax({
                url: '/api/topics/' + topicId +'/posts/new',
                type: "POST",
                data: JSON.stringify(post),
                success: function () {
                    $("#post-content").val(null);
                    button.removeAttr('disabled');
                },
                error: function () {
                    alert('Nem sikerült elmentei a hozzászólást!');
                    // hiba esetén az utolsó hozzászólást töröljük
                    // (a szerver nem mentette el)
                    $(".post:last").remove();
                },
            });

            // megmutatjuk az új bejegyzést bár még valójában nem jött létre a szerveren
            post.date = new Date().toLocaleString("hu");
            $('#posts-container').append(
                Mustache.render($('#post-template').html(), {posts: [post]})
            );
        } else {
            $(".error").show();
        }
    });
});

var Post = function (post) {
    // lemásoljuk a postban kapott értékeket a this-be
    $.extend(this, post);
}

Post.prototype.date = function () {
    return new Date(this.timestamp).toLocaleString("hu");
};