$(document).ready(function (){
    var hash = window.location.hash.substr(1),
        page = hash ? parseInt(hash) : 1;

    downloadTopics(page);

    $(".pagination a").click(function () {
        var direction = this.id === 'prev' ? -1 : 1;
        page += direction;
        downloadTopics(page);
    });
});

var downloadTopics = function (page) {
    Utils.showHidePagination('prev', function () { return page === 1; });
    window.location.hash = page;

    $.ajax({
        url: '/api/topics?page=' + page,
        dataType: 'json'
    }).done(function (data) {
        data.topics.sort(function(t1,t2) {
            return new Date(t2.last_post_date) - new Date(t1.last_post_date);
        });
        $('#topics-container').html(
            Mustache.render($('#topic-template').html(), data)
        );

        Utils.showHidePagination('next', function () { return data.topics.length === 0; });
    }).fail(function (data) {
        alert('There was an error: ' + data.message);
    });
};
