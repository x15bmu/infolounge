var newsURL = 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=headline&count=10&offset=0&mkt=en-us&safeSearch=Moderate';

function getNews() {
	var params = {
		// Request parameters
		"q": "headline",
		"count": "4",
		"offset": "0",
		"mkt": "en-us",
		"safeSearch": "Moderate",
	};
	$.ajax({
		url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search?" + $.param(params),
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","4bf03033990448a482ff36bb85f424a6");
		},
		type: "GET",
	})
	.done(function(data) {
		
		var news = data.value;
		var lines = [];
		for (var n of news) {
			n.name;
			n.description;
			n.image.thumbnail.contentUrl;
			var line = '';
			line += '<div class="news-wrapper">'
			line += '<img src="' + n.image.thumbnail.contentUrl + '" class="news-image">';
			line += '<div class="news-body"><h4>' + n.name + '</h4><p>' + n.description + '</div>';
			line += '</div><br style="clear: both;" />';
			lines.push(line);
		}
		$("#newspanel").slideDown("slow");
		$("#news").html(lines.join('\n'));
	});
}
