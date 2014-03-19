$(document).ready(function (){
    $.ajax({
        url: '/api/topics',
        dataType: 'json'
    }).done(function (data) {
        $('#topics-container').append(
            Mustache.render($('#topic-template').html(), data)
        );
    }).fail(function (data) {
        alert('There was an error: ' + data.message);
    });
});