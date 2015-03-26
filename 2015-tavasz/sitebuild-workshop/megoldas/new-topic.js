$(document).ready(function () {
    $("#submit-topic-form").click(function () {
        var topic = {
            title: $("#topic-title").val(),
            description: $("#topic-description").val()
        };

        if (Utils.validatePresenceOf(topic, ["title", "description"])) {
            $.post('/api/topics/new', JSON.stringify(topic), function () {
                window.location = "/";
            });
        } else {
            $(".error").show();
        }
    });
});