
$(document).ready(function () {

	$.ajax({
		method: 'GET',
		url: 'http://stewie.sch.bme.hu:8089/api/topics',
	}).done(function (data) {
		data = JSON.parse(data);
		
		if(data.status_code == 200) {
			data.topics.forEach(function (topic) {
				$('<h3><a href="topic.html?id=' + topic.id + '">' + topic.title + '</a></h3>').appendTo(".topic");
				$('<p/>', {
					text: topic.description
				}).appendTo(".topic");
			});
		}
	});

});
