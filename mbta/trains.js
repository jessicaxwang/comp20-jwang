function initMap() {
var j = 0;
var icon = 'redline.png';
var infoWindow = new google.maps.InfoWindow();

var ashmont = [
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
]

var braintree = [
{name: "JFK/Umass", coords: {lat: 42.320685, lng: -71.052391}, stop_id: "place-jfk"},
{name: "North Quincy", coords: {lat: 42.275275, lng: -71.029583}, stop_id: "place-nqncy"},
{name: "Wollaston", coords: {lat: 42.2665139, lng: -71.0203369}, stop_id: "place-wlsta"},
{name: "Quincy Center", coords: {lat: 42.251809, lng: -71.005409}, stop_id: "place-qnctr"},
{name: "Quincy Adams", coords: {lat: 42.233391, lng: -71.007153}, stop_id: "place-qamnl"},
{name: "Braintree", coords: {lat: 42.2078543, lng: -71.0011385}, stop_id: "place-brntn"}
]

/* Polyline paths */
var ashmontPath = [
  ashmont[0].coords,
  ashmont[1].coords,
  ashmont[2].coords,
  ashmont[3].coords,
  ashmont[4].coords,
  ashmont[5].coords,
  ashmont[6].coords,
  ashmont[7].coords,
  ashmont[8].coords,
  ashmont[9].coords,
  ashmont[10].coords,
  ashmont[11].coords,
  ashmont[12].coords,
  ashmont[13].coords,
  ashmont[14].coords,
  ashmont[15].coords,
  ashmont[16].coords
]

var braintreePath = [
  braintree[0].coords,
  braintree[1].coords,
  braintree[2].coords,
  braintree[3].coords,
  braintree[4].coords,
  braintree[5].coords,
]

var map;
map = new google.maps.Map(document.getElementById("map"), {
  center: ashmont[9].coords,
  zoom: 13
});

var total_length =  ashmont.length + braintree.length + 1;
for (var i = 0; i < total_length; i++) {
  /* Don't double-mark JFK/UMass */
   if (i < ashmont.length) {
    /* Make a marker, put it on the map */
    marker = new google.maps.Marker({position: ashmont[i].coords, 
      map: map, 
      icon: icon,

      /* Custom attributes */
      stop_id: ashmont[i].stop_id,
      station_name: ashmont[i].name

    });
    marker.setMap(map);

    /* Get train schedule data */ 
    marker.addListener('click', function() {
      marker = this;
      var data = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + marker.get('stop_id');

      var request = new XMLHttpRequest();
      request.open("GET", data, true);
      request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        request = request.responseText;
        schedule = JSON.parse(request);

        today = new Date().toLocaleString().substr(0,9);

        content = "<h4>Arrival Times for " + marker.get('station_name') + " on " + today + ":</h4>";
        for (var k = 0; k < schedule.data.length; k++) {
          time = new Date(schedule.data[k].attributes.arrival_time).toString().substr(15, 9);
          content += "<li>" + time + "</li>";
        }
        infoWindow.setContent(content);
        infoWindow.open(map, marker);

      } else if (request.readyState == 4 && request.status != 200) {
        infoWindow.setContent("Sorry, the schedule couldn't be loaded.");
        infoWindow.open(map, marker);
      } 
     }

     request.send();
   });

   } else {
    if (i != ashmont.length) {
      marker = new google.maps.Marker({position: braintree[j].coords, 
        map: map, 
        icon: icon,

        /* Custom attributes */
        stop_id: braintree[j].stop_id,
        station_name: braintree[j].name
      });
      marker.setMap(map);

      /* Get train schedule data */ 
      marker.addListener('click', function() {
        marker = this;
        var data = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + marker.get('stop_id');

        var request = new XMLHttpRequest();
        request.open("GET", data, true);
        request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          request = request.responseText;
          schedule = JSON.parse(request);

          today = new Date().toLocaleString().substr(0,9);

          content = "<h4>Arrival Times for " + marker.get('station_name') + " on " + today + ":</h4>";
          for (var k = 0; k < schedule.data.length; k++) {
            time = new Date(schedule.data[k].attributes.arrival_time).toString().substr(15, 9);
            content += "<li>" + time + "</li>";
          }
          infoWindow.setContent(content);
          infoWindow.open(map, marker);

        } else if (request.readyState == 4 && request.status != 200) {
          infoWindow.setContent("Sorry, the schedule couldn't be loaded.");
          infoWindow.open(map, marker);
        } 
      }
        request.send();
      });

      j++;
    }
  }
  
  /* Set polylines */
  if (i < ashmont.length) {
   polyline = new google.maps.Polyline({
      path: ashmontPath,
     strokeColor: 'red'
    });
  } else {
    polyline = new google.maps.Polyline({
      path: braintreePath,
      strokeColor: 'red'
    });
  }

  polyline.setMap(map);
}

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
});

}
}




