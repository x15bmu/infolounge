var startDate = new Date(2017, 2-1, 13);
var house = ['Ben', 'Denis', 'Nayeon', 'Lef', 'Saya'];
var bathroom = ['Nayeon', 'Saya', 'Denis', 'Lef'];

function getChores() {
	var weeks = Math.floor((getChoresDate()-startDate) / 604800000);
	$("#chorespanel").slideDown("slow");
	$("#chores-house-assignee").html('<div class="chores-assignee">' + house[weeks % house.length] + '</div>');
	$("#chores-bathrooms-assignee").html('<div class="chores-assignee">' + bathroom[weeks % bathroom.length] + '</div>');
}

function getChoresDate() {
	var date = new Date();
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
