function initMap() {
var j = 0;
var icon = 'redline.png';
var infoWindow = new google.maps.InfoWindow();

var stations = [
{name: "Alewife", coords: {lat: 42.395428, lng: -71.142483}, stop_id: "place-alfcl"},
{name: "Davis", coords: {lat: 42.39674, lng: -71.121815}, stop_id: "place-davis"},
{name: "Porter Square", coords: {lat: 42.3884, lng: -71.11914899999999}, stop_id: "place-portr"},
{name: "Harvard Square", coords: {lat: 42.373362, lng: -71.118956}, stop_id: "place-harsq"},
{name: "Central Square", coords: {lat: 42.365486, lng: -71.103802}, stop_id: "place-cntsq"},
{name: "Kendall/MIT", coords: {lat: 42.36249079, lng: -71.08617653}, stop_id: "place-knncl"},
{name: "Charles/MGH", coords: {lat: 42.361166, lng: -71.070628}, stop_id: "place-chmnl"},
{name: "Park Street", coords: {lat: 42.35639457, lng: -71.0624242}, stop_id: "place-pktrm"},
{name: "Downtown Crossing", coords: {lat: 42.355518, lng: -71.060225}, stop_id: "place-dwnxg"},
{name: "South Station", coords: {lat: 42.352271, lng: -71.05524200000001}, stop_id: "place-sstat"},
{name: "Broadway", coords: {lat: 42.342622, lng: -71.056967}, stop_id: "place-brdwy"},
{name: "Andrew", coords: {lat: 42.330154, lng: -71.057655}, stop_id: "place-andrw"},
{name: "JFK/Umass", coords: {lat: 42.320685, lng: -71.052391}, stop_id: "place-jfk"},
{name: "Savin Hill", coords: {lat: 42.31129, lng: -71.053331}, stop_id: "place-shmnl"},
{name: "Fields Corner", coords: {lat: 42.300093, lng: -71.061667}, stop_id: "place-fldcr"},
{name: "Shawmut", coords: {lat: 42.29312583, lng: -71.06573796000001}, stop_id: "place-smmnl"},
{name: "Ashmont", coords: {lat: 42.284652, lng: -71.06448899999999}, stop_id: "place-asmnl"},
{name: "North Quincy", coords: {lat: 42.275275, lng: -71.029583}, stop_id: "place-nqncy"},
{name: "Wollaston", coords: {lat: 42.2665139, lng: -71.0203369}, stop_id: "place-wlsta"},
{name: "Quincy Center", coords: {lat: 42.251809, lng: -71.005409}, stop_id: "place-qnctr"},
{name: "Quincy Adams", coords: {lat: 42.233391, lng: -71.007153}, stop_id: "place-qamnl"},
{name: "Braintree", coords: {lat: 42.2078543, lng: -71.0011385}, stop_id: "place-brntn"}
]

/* Polyline paths */
var ashmontPath = [
  stations[0].coords,
  stations[1].coords,
  stations[2].coords,
  stations[3].coords,
  stations[4].coords,
  stations[5].coords,
  stations[6].coords,
  stations[7].coords,
  stations[8].coords,
  stations[9].coords,
  stations[10].coords,
  stations[11].coords,
  stations[12].coords,
  stations[13].coords,
  stations[14].coords,
  stations[15].coords,
  stations[16].coords
]

var braintreePath = [
  stations[12].coords,
  stations[17].coords,
  stations[18].coords,
  stations[19].coords,
  stations[20].coords,
  stations[21].coords,
]

/* Array of markers */
var stopMarkers = [];

var map;
map = new google.maps.Map(document.getElementById("map"), {
  center: stations[9].coords,
  zoom: 12
});

var total_length =  stations.length;
for (var i = 0; i < total_length; i++) {
    /* Make a marker, put it on the map */
    marker = new google.maps.Marker({position: stations[i].coords, 
      map: map, 
      icon: icon,

      /* Custom attributes */
      stop_id: stations[i].stop_id,
      station_name: stations[i].name

    });
    marker.setMap(map);
    stopMarkers.push(marker);

    /* Get train schedule data */ 
    marker.addListener('click', function() {
      marker = this;
      var data = "https://stark-castle-39816.herokuapp.com/redline/schedule.json" + "?stop_id=" + marker.get('stop_id');
      var request = new XMLHttpRequest();
      var tracker = new XMLHttpRequest();
      request.open("GET", data, true);
      tracker.open("POST", data, true);

      request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        request = request.responseText;
        schedule = JSON.parse(request);

        today = new Date().toLocaleString().substr(0,9);

        content = "<h2>" + marker.get('station_name') + " (Arrivals) </h2>";

        /* Wollaston is currently unavailable */
        if (marker.get('station_name') != "Wollaston") {
          for (var k = 0; k < schedule.data.length; k++) {
            time = new Date(schedule.data[k].attributes.arrival_time).toString().substr(15, 9);

            content += "<li>" + time;

            direction = schedule.data[k].attributes.direction_id;

            if (direction == 0 && marker.get('station_name') != "Braintree") {
              content += " going Southbound to Ashmont/Braintree </li>";
            } else if (direction == 1 && marker.get('station_name') != "Alewife") {
              content += " going Northbound to Alewife </li>";
            } else {
              content += "</li>";
            }
          }
        } else {
          content += "This station is currently under construction!";
        }

        infoWindow.setContent(content);
        infoWindow.open(map, marker);

      } else if (request.readyState == 4 && request.status != 200) {
        infoWindow.setContent("Sorry, the schedule couldn't be loaded.");
        infoWindow.open(map, marker);
      } 
     }

     request.send();
     tracker.send();
   });
  
}
/* Set polylines */
ashmontLine = new google.maps.Polyline({
    path: ashmontPath,
    strokeColor: 'red',
    strokeOpacity: 0.6,
    strokeWeight: 2
  });
braintreeLine = new google.maps.Polyline({
    path: braintreePath,
    strokeColor: 'red',
    strokeOpacity: 0.6,
    strokeWeight: 2
  });

ashmontLine.setMap(map);
braintreeLine.setMap(map);

/* Set geolocation */
if (navigator.geolocation) {
  var pos;
  navigator.geolocation.getCurrentPosition(function(position) {
    pos = { 
      lat: position.coords.latitude, 
      lng: position.coords.longitude
    };

    /* Get current position */
    marker = new google.maps.Marker({position: pos, map: map});
    marker.setMap(map);

    /* Assume Alewife is the shortest */
    shortest_dist = google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), stopMarkers[0].getPosition()) / 1609.34;
    closest_station = stopMarkers[0];

    /* Find the closest stop */
    for (i = 1; i < stopMarkers.length; i++) {
      var curr_dist = google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), stopMarkers[i].getPosition()) / 1609.34;
      if (curr_dist < shortest_dist) {
        shortest_dist = curr_dist;
        closest_station = stopMarkers[i];
      }
    }

    /* Round to 2 dec. places */
    shortest_dist = Math.round(shortest_dist * 100) / 100;

    /* Info window displays closest station */
    marker.addListener('click', function() {
      marker = this;
      content = "<h3> Closest Station </h3>" + "Your closest station is " + closest_station.get('station_name') + ", which is " + shortest_dist + " miles away!";
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });

    /* Make a polyline */
    shortestPath = [
      marker.getPosition(),
      closest_station.getPosition()
    ]

    myLine = new google.maps.Polyline({
      path: shortestPath,
      strokeColor: '#399CB9',
      strokeOpacity: 1.0,
      strokeWeight: 2
  })

  myLine.setMap(map);

});
}
}




