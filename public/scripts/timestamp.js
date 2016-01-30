var naturalDate = function (date) {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
					"October", "November", "December"]
	var naturalMonth = months[date.getMonth()]
	return naturalMonth + " " + date.getDate() + ", " + date.getFullYear();
}

exports.createTimeObj = function (query) {
	if (Date.parse(query)) {
		if (!isNaN(query)) {
			var requestedDate = new Date(+query);
		} else {
			var requestedDate = new Date(query);
		}

		var unix = requestedDate.getTime();
		var natural = naturalDate(requestedDate);
		return {unix: unix, natural: natural};
	} else {
		return {unix: null, natural: null};
	}
}