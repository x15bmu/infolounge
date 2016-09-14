function getWeather() {
    $.simpleWeather({
        location: 'Mission District, San Francisco, CA',
        unit: 'f',
        success: function(weather) {
            var date = new Date();
            date.setDate(date.getDate() + 2);
            var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            html = '<div class="row">';
            html += '<div class="large-4 columns"><img src="images/weather/' + weather.code + '.png"></div>';
            html += '<div class="large-8 columns">';
            // html += '<span class="weather-feel">Now</span><br/>';
            html += '<br />';
            html += '<span class="weather-temp">' + weather.temp + '&deg;F (' +  weather.alt.temp + '&deg;C)</span><br/>';
            html += '<span class="weather-feel">Feels like ' + weather.wind.chill + '&deg;F (' +  ((weather.wind.chill-32)*(5/9)).toFixed()  + '&deg;C)</span><br/>';
            html += '</div></div><br />';
            html += '<div class="row">';
            html += '<div class="large-4 columns">Today</div>';
            html += '<div class="large-4 columns">Tomorrow</div>';
            html += '<div class="large-4 columns">' + weekday[date.getDay()] + '</div>';
            html += '<div class="row weather-forecast-wrapper">';
            html += '<div class="large-4 columns"><img src="images/weather/' + weather.forecast[0].code + '.png">';
            html += '<span class="weather-forecast"> ' + weather.forecast[0].high + '&deg;F / ' + weather.forecast[0].low + '&deg;F</span></div>';
            html += '<div class="large-4 columns"><img src="images/weather/' + weather.forecast[1].code + '.png">';
            html += '<span class="weather-forecast"> ' + weather.forecast[1].high + '&deg;F / ' + weather.forecast[1].low + '&deg;F</span></div>';
            html += '<div class="large-4 columns"><img src="images/weather/' + weather.forecast[2].code + '.png">';
            html += '<span class="weather-forecast"> ' + weather.forecast[2].high + '&deg;F / ' + weather.forecast[2].low + '&deg;F</span></div>';
            html += '</div>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
};
