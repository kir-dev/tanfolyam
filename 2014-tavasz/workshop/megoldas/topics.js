$(document).ready(function (){
    $.ajax({
        url: '/api/topics',
        dataType: 'json'
    }).done(function (data) {
        data.topics.sort(function(t1,t2) {
            return new Date(t2.last_post_date) - new Date(t1.last_post_date);
        });
        $('#topics-container').append(
            Mustache.render($('#topic-template').html(), data)
        );
    }).fail(function (data) {
        alert('There was an error: ' + data.message);
    });
});