
function getDate() {
    var now = new Date();

    var people = [
	['Nayeon', 'December 7, 1993 00:00:00'],
	['Angie', 'January 25, 1992 00:00:00'],
	['Saya', 'September 2, 1993 00:00:00'],
	['Lef', 'January 20, 1992 00:00:00']
    ];

    var dict = [];
    for (var i = 0; i < people.length; i += 1) {
	var age = 0;
	var date = new Date(people[i][1]);
	while (date < now) {
	    age++;
	    date.setYear(date.getFullYear() + 1);
	}
	age--;
	date.setYear(date.getFullYear() - 1);
	age += (now - date) / 1000 / 60 / 60 / 24 / (now.getYear() % 4 == 0 ? 366 : 365);
	var ageStr = age.toFixed(8);
        var ageIncStr = (age - 0.000001).toFixed(8);
	var fracpart = ageIncStr.substring(ageIncStr.indexOf('.'));
	dict.push([fracpart, '<div class="subdate">' + people[i][0] + ' is ' + ageStr + ' years old</div>']);

    if (people[i][0] == 'normandy' && age > 21){
      //$("#birthdaybanner").show()
    }

    }
    dict.sort();
    if (now.getMonth() == 8)
        var elem = dateFormat(now, 'ddd, d mmm');
    else
        var elem = dateFormat(now, 'ddd, d mmmm');
    for (var i = dict.length; --i >= dict.length - 3; ) {
	elem += dict[i][1];
    }
    $("#date").html(elem);
}

