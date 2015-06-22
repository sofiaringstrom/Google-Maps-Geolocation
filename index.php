<!DOCTYPE html>
<html>
<head>

	<title></title>

	<meta name="description" content="">
	<meta name="author" content="Sofia Ringström">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" type="text/css" href="style.css">

</head>
<body>

	<h1>HTML5 API - Geolocation</h1>

	<div id="tripMeter">

		<h2>Starting Location</h2> <button id="start-btn">Show</button>
		
		<div id="start-lat-lon">

			Latitude: <span id="startLat"></span>°
			<br />
			Longitude: <span id="startLon"></span>°

		</div>

		<br />

		<h2>Current Location</h2> <button id="current-btn">Show</button>
		
		<div id="current-lat-lon">

			Latitude: <span id="currentLat"></span>°
			<br />
			Longitude: <span id="currentLon"></span>°

		</div>

		<br />

		<h3>Distance:</h3> ~ <span id="distance">0</span> km

	</div><!-- #tripMeter -->


	<div id="explanation">

		<span>This is your start point: </span><img src="original_marker.png">

	</div><!-- #explanation -->


	<div id="map"></div>


	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAW5gfO67EKUs6ffcT_Ui4o4RsQsoXxd28"></script>
	<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
	<script src="main.js"></script>

</body>
</html>