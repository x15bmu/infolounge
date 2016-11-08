var startDate = new Date(2016, 10-1, 31);
var house = ['Ben', 'Angie', 'Nayeon', 'Saya'];
var bathroom = ['Nayeon', 'Saya', 'Angie'];

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
