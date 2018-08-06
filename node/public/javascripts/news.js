var newsURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=bfa9eb24ff4d488c9cd9843a9dc5a785';
var newsOffset = 0;
var newsCount = 3;
var newsGroupCount = 3;
var newsChangeTime = 15000;
var newsStartTime = Date.now();
var newsTimeout = null;
var newsData = [];

var newsKey = 'bfa9eb24ff4d488c9cd9843a9dc5a785';

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
		"country": "us",
		"pageSize": newsCount * newsGroupCount,
		"apiKey": newsKey,
	};
	$.ajax({
		url: 'https://newsapi.org/v2/top-headlines?' + $.param(params),
		type: "GET",
	})
	.done(function(data) {
		newsData = data.articles;
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
		var line = '';
		line += '<div class="news-wrapper">'
		line += '<div class="news-image"><img src="' + n.urlToImage + '"></div>';
		line += '<div class="news-body"><h4>' + n.title + '</h4><p>' + n.description + '</div>';
		line += '</div><br style="clear: both;" />';
		lines.push(line);
	}
	lines.push('</div>');
	$("#newspanel").slideDown("slow");
	$("#news").append(lines.join('\n'));
	newsOffset += newsCount;
	if (newsOffset >= newsCount * newsGroupCount) {
		newsOffset = 0;
	}
	$('.old-news-group').slideUp('slow', function() {
		$(this).remove();
	});
	newsStartTime = Date.now();
	newsTimeout = setTimeout(resultsFunc, newsChangeTime);
}
