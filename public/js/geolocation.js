function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		document.getElementById("whereami").href="/api/whereami?geo=false"
	}
}

function showPosition(position) {
	var location = {lat: position.coords.latitude, lon: position.coords.longitude}
	document.getElementById("whereami").href="/api/whereami?geo=true&lat=" + location.lat + "&lon=" + location.lon;
}

getLocation();