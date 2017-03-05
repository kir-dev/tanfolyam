
$(document).ready(function () {

	$.ajax({
		method: 'GET',
		url: 'http://stewie.sch.bme.hu:80/api/topics'

	}).done(function(data) {

		data = JSON.parse(data);

		if(data.status_code == 200){
			data.topics.forEach(function(topic){
				$('<h3> <a href="topic.html?id=' + topic.id + '">' + topic.title + '</a></h3>').appendTo('#topics-container');
				$('<p>' + topic.description + '</p>').appendTo('#topics-container');

			});
		}
	});

});