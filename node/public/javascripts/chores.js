var startDate = new Date(2017, 2-1, 13);
var house = ['Ben', 'Denis', 'Nayeon', 'Lef', 'Saya'];
var bathroom = ['Nayeon', 'Saya', 'Denis', 'Lef'];

function getChores() {
	var weeks = Math.floor((getChoresDate()-startDate) / 604800000);
	$("#chorespanel").slideDown("slow");
	$("#chores-house-assignee").html('<div class="chores-assignee">' + house[weeks % house.length] + '</div>');
	$("#chores-house-next").text(computeUpNext(house, weeks).join(', '));
	$("#chores-bathrooms-assignee").html('<div class="chores-assignee">' + bathroom[weeks % bathroom.length] + '</div>');
	$("#chores-bathrooms-next").text(computeUpNext(bathroom, weeks).join(', '));
}

function getChoresDate() {
	var date = new Date();
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function computeUpNext(array, currentIdx) {
	currentIdx %= array.length;
	var upNext = [];
	for (var i = 1; i < array.length; i++) {
		upNext.push(array[(currentIdx + i) % array.length]);
	}
	return upNext;
}
