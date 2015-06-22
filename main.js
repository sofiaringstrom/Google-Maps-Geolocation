// The progress coordinates array, needed to draw path
var progressCoordinates = [];

// Stores amout of new positions, maybe delete this later?
var i = 0;

var preLat;
var preLon;

$(document).ready( function() {


	$('#start-btn').click( function() {
		
		$('#start-lat-lon').slideToggle();

		showHideBtn($('#start-btn'));

	});


	$('#current-btn').click( function() {

		$('#current-lat-lon').slideToggle();

		showHideBtn($('#current-btn'));

	});


	if (navigator.geolocation) {

		console.log('Geolocation is supported! :)');

		// Get current location
		var startPosition;

		navigator.geolocation.getCurrentPosition( function(position) {

			startPosition = position;

			var startLat = startPosition.coords.latitude;

			var startLon = startPosition.coords.longitude;

			setStartPosition(position);

			// Print values 

			$('#startLat').empty().append(startLat);

			$('#startLon').empty().append(startLon);

			preLat = startLat;
			preLon = startLon;


		}, function(error) {

			// 0 = unknown error
			// 1 = permission denied
			// 2 = position unavailable
			// 3 = timed out

			try {

				if ( error.code == 0 ) {

					throw '0: Unknown error.';

				}

				if ( error.code == 1 ) {

					throw '1: Permission denied.';
					
				}

				if ( error.code == 2 ) {

					throw '2: Position unavailable.';
					
				}

				if ( error.code == 3 ) {

					throw '3: Timed out';
					
				}

			} catch(err) {

				alert('Some error occured. Error Code: ' + err);

			}

		});



		// Stores the distance
		var distance = 0;

		// Get progress location
		navigator.geolocation.watchPosition( function(position) {

			var currentLat = position.coords.latitude;

			var currentLon = position.coords.longitude;

			$('#currentLat').empty().append(currentLat);

			$('#currentLon').empty().append(currentLon);

			// create array with coordinates, for each new position, push array, call function with new coordinates

			progressCoordinates.push( new google.maps.LatLng(currentLat, currentLon) );

			drawProgress(progressCoordinates);


			// Calculate distance between the previously position and the current one

			var newDistance = calculateDistance(preLat, preLon, currentLat, currentLon);

			// Adds the new distance to the overall distance

			newDistance = parseFloat(newDistance);

			distance = Number(distance + newDistance);


			$('#distance').empty().append(distance);


			// Updates the previously position

			preLat = currentLat;

			preLon = currentLon;


		});


	} else {

		alert('Geolocation is not supported for this browser/OS version yet. :(');

	}


	// Creating the map
	createMap();


});	


function showHideBtn(element) {

	if ( !element.hasClass('hide') ) {

		element.text('Hide');

		element.addClass('hide');

	} else {

		element.text('Show');

		element.removeClass('hide');

	}

}


var mapOptions;
var map;
var defaultMarker;

// Creates the map
function createMap() {

	mapOptions = {
		center: { lat: 60.12816, lng: 18.64350 },
		zoom: 5,
		scrollwheel: false,
		mapTypeControl: false
	}


	var mapStyle = [{
		featuredType: 'all',
		elementType: 'geometry'
	}];


	map = new google.maps.Map(
		document.getElementById('map'),
		mapOptions
		);


	// Initiates the map style
	map.setOptions({styles: mapStyle});

}

// Sets the start position on the map
function setStartPosition(startPosition) {

	var startLat = startPosition.coords.latitude;

	var startLon = startPosition.coords.longitude;

	var startMarker = new google.maps.Marker({
		position: { lat: startLat, lng: startLon },
		Map: map,
		title: 'Your start point'
	});


	// Sets new options based on the current position
	var newMapOptions = {
		center: { lat: startLat, lng: startLon },
		zoom: 17
	}

	// Initiates the new map option
	map.setOptions(newMapOptions);

}


// Draws the path
function drawProgress(progressCoordinates) {

	var progressPath = new google.maps.Polyline({
		path: progressCoordinates,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeWeight: 4
	});

	// Draws path on map
	progressPath.setMap(map);

	// Keep latest position in center
	var latestPosition = progressCoordinates[progressCoordinates.length-1];

	map.setCenter(latestPosition);

}

// Calculates the distance from start to current
function calculateDistance(startLat, startLon, currentLat, currentLon) {

	var r = 6371; // km

	var dLat = (startLat - currentLat).toRad();

	var dLon = (startLon - currentLon).toRad();

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(startLat.toRad()) * Math.cos(currentLat.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	var d = r * c;

	d = d.toFixed(2);

	return d;

}

// Does some math, I don't know why
Number.prototype.toRad = function() {

	return this * Math.PI / 180;

}
