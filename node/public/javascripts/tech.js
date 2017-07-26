'use strict';

var predictionsTEK = "http://proximobus.appspot.com/agencies/mit/stops/51/predictions.json";
	// tech shuttle and saferide cambridge, at tang/westgate

var predictionsSFBOS = "http://proximobus.appspot.com/agencies/mit/stops/62/predictions.json";
	// saferide boston, at audrey/vassar sts

var predictionsCT2N = "http://proximobus.appspot.com/agencies/mbta/stops/21772/predictions.json";
	// crosstown 2, to sullivan sq via kendall sq, at amesbury/vassar sts

var predictionsCT2S = "http://proximobus.appspot.com/agencies/mbta/stops/22173/predictions.json";
	// crosstown 2, to ruggles st/northereastern university via fenway, at amesbury st/memorial dr

var elem = '';
var tone = 0;

function handlePredictions2(data) {
    var predictions = data.items;

    if (predictions.length == 0) {
        elem = '';
        return;
    }

    for (var i = 0; i < 2; i++) {
        prediction = predictions[i];

	if (i == 0) {
            elem = '<li><span class="tech-minutes2">';
	} else {
	    elem += '<li><span class="tech-minutes2">';}

        var minutes = prediction.minutes;
        if (minutes == 0) {
            elem += (prediction.is_departing ? "Arrv</span>&nbsp;<span class='tech-route2'>" : "Arrv</span>&nbsp;<span class='tech-route2'>");
        } else {
            elem += (minutes + '</span>&nbsp;<span class="tech-route2">m ');
        }

        var route = '';
        if (prediction.route_id == 'tech') {
            route = 'Tech Shuttle';
        } else if (prediction.route_id == 'saferidecambwest') {
            route = 'Saferide Cambridge';
        } else if (prediction.route_id == 'saferidecamball') {
            route = 'Saferide Cambridge';
        } else if (prediction.route_id == 'traderjwf') {
            route = 'Central/Kendall Sqs';
        } else {
            route = prediction.route_id;
        }
        elem += ('&nbsp;-&nbsp;&nbsp;' + route + '</span></li>');
    }

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}

function handlePredictions(data) {
    var predictions = data.items;

    for (var i = 0; i < 1; i++) {
        prediction = predictions[i];
        elem += '<li><span class="tech-minutes">';

        var minutes = prediction.minutes;
        if (minutes == 0) {
            elem += (prediction.is_departing ? "Arrv</span>&nbsp;<span class='tech-route'>" : "Arrv</span>&nbsp;<span class='tech-route'>");
        } else {
            elem += (minutes + '</span>&nbsp;<span class="tech-route">m ');
        }

        var route = '';
        if (prediction.route_id == 'saferidebostonall') {
            route = 'ZBT/Packard\'s Corner';
        } else if (prediction.route_id == 'saferidebostonw') {
            route = 'ZBT/Packard\'s Corner';
        } else if (prediction.route_id == '747' && tone == 0) {
            route = 'CT2, Fenway/Northeastern';
	    tone = 1;
        } else if (prediction.route_id == '747' && tone == 1) {
            route = 'CT2, Kendall/Sullivan Sqs';
        } else {
            route = prediction.route_id;
        }
        elem += ('&nbsp;-&nbsp;&nbsp;' + route + '</span></li>');
    }

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}

function sortTime(list) {
    list.sort((a, b) => {
        if (a.minutes > b.minutes) {
            return 1;
        } else if (a.minutes < b.minutes) {
            return -1;
        }
        return 0;
    });
}

function timeFormat(mins) {
    if (mins >= 60) {
        let hours = Math.floor(mins / 60);
        mins = mins % 60;
        return hours + 'h ' + mins + 'm';
    } else {
        return mins + 'm';
    }
}

function buildHtml(trains) {
    let walkTime = 6;
    trains = trains.filter((e) => e.minutes >= walkTime);

    if (trains.length === 0) {
        return '<div class="bart-time">None</div>';
    }
    let html = '<div class="bart-time">' + timeFormat(trains[0].minutes) + '</div>'
    let leaveTime = trains[0].minutes - walkTime;
    if (leaveTime === 0) {
        html += '<div class="bart-leave-time">Leave now</div>';
    } else {
        html += '<div class="bart-leave-time">Leave in ' + timeFormat(leaveTime) + '</div>';
    }

    if (trains.length > 1) {
        html += '<br /><div class="bart-later">Later ';
        html += timeFormat(trains[1].minutes);
        if (trains.length > 2) {
            html += ', ' + timeFormat(trains[2].minutes);
        }
        if (trains.length > 3) {
            html += ', ' + timeFormat(trains[3].minutes);
        }
        html += '</div>';
    }
    return html;
}

function handleBart(xml) {
    let toNorth = [];
    let toAirport = [];
    $(xml).find('etd').each((i, destination) => {
        $(destination).find('estimate').each((j, estimate) => {
            let est = $(estimate);
            let obj = {};
            obj.minutes = parseInt(est.find('minutes').text());
            obj.destination = $(destination).find('destination').text();
            obj.direction = est.find('direction').text();
            obj.abbr = $(destination).find('abbreviation').text();
            obj.color = est.find('color').text();
            if (obj.direction === 'North') {
                toNorth.push(obj);
            } else if (obj.abbr === 'SFIA' || (obj.abbr === 'MLBR' && obj.color === 'YELLOW')) {
                toAirport.push(obj);
            }
        });
    });

    sortTime(toNorth);
    sortTime(toAirport);

    $('#inbound-bart').html(buildHtml(toNorth));
    $('#outbound-bart').html(buildHtml(toAirport));
}


function getPredictions() {
    // Old techshuttle stuff
    // $.getJSON(predictionsTEK, handlePredictions2);
    // $.getJSON(predictionsSFBOS, handlePredictions);
    // $.getJSON(predictionsCT2N, handlePredictions);
    // $.getJSON(predictionsCT2S, handlePredictions);
    // TODO get API key
    $.get('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=24th&key=MW9S-E7SL-26DU-VV8V', handleBart);
};

if (elem.length == 0) {
    $("#techpanel").slideUp("slow");
}

if (elem.length == 0) {
    $("#techpanel").slideUp("slow");
}
