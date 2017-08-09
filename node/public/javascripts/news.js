var newsURL = 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=headline&count=10&offset=0&mkt=en-us&safeSearch=Moderate';
var newsOffset = 0;
var newsCount = 3;
var newsGroupCount = 3;
var newsChangeTime = 15000;
var newsStartTime = Date.now();
var newsTimeout = null;
var newsData = [];

var newsKeys = ["02c48d6f3e1348118d4e14cccaaaaff8", "4bf03033990448a482ff36bb85f424a6"];
var newsKeyCounter = 0;

// TODO - investigate this: https://newsapi.org/associated-press-api

function progressBar() {
	var pct = (Date.now() - newsStartTime)/newsChangeTime * 100;
	if (pct > 100) {
		pct = 100;
	}
	$('#news-progress-bar').width(pct + '%');
}
setInterval(progressBar, 15);

function getNews() {
	clearTimeout(newsTimeout);
	var params = {
		// Request parameters
		"q": "headline",
		"count": newsCount * newsGroupCount,
		"offset": newsOffset,
		"mkt": "en-us",
		"safeSearch": "Moderate",
	};
	$.ajax({
		url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search?" + $.param(params),
		beforeSend: function(xhrObj){
			// Request headers
			var key = newsKeys[newsKeyCounter];
			newsKeyCounter++;
			newsKeyCounter %= newsKeys.length;
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", key);
		},
		type: "GET",
	})
	.done(function(data) {
		newsData = data.value;
		resultsFunc();
	});
}

function resultsFunc() {
	var news = newsData.slice(newsOffset, newsOffset+newsCount);
	var lines = [];
	$('.new-news-group').addClass('old-news-group');
	$('.new-news-group').removeClass('new-news-group');
	lines.push('<div class="new-news-group">');
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
	lines.push('</div>');
	$("#newspanel").slideDown("slow");
	$("#news").append(lines.join('\n'));
	newsOffset += newsCount;
	if (newsOffset >= newsGroupCount*newsCount) {
		newsOffset = 0;
	}
	$('.old-news-group').slideUp('slow', function() {
		$(this).remove();
	});
	newsStartTime = Date.now();
	newsTimeout = setTimeout(resultsFunc, newsChangeTime);
}