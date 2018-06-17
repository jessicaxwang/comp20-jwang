function initMap() {
var i, polyline, marker, data, content, parsed, contentString, stop_times, id, k;
var j = 0;
var icon = 'redline.png';
var infoWindow = new google.maps.InfoWindow();

var ashmont = [
{name: "Alewife", lat: 42.395428, lng: -71.142483, stop_id: "place-alfcl"},
{name: "Davis", lat: 42.39674, lng: -71.121815, stop_id: "place-davis"},
{name: "Porter Square", lat: 42.3884, lng: -71.11914899999999, stop_id: "place-portr"},
{name: "Harvard Square", lat: 42.373362, lng: -71.118956, stop_id: "place-harsq"},
{name: "Central Square", lat: 42.365486, lng: -71.103802, stop_id: "place-cntsq"},
{name: "Kendall/MIT", lat: 42.36249079, lng: -71.08617653, stop_id: "place-knncl"},
{name: "Charles/MGH", lat: 42.361166, lng: -71.070628, stop_id: "place-chmnl"},
{name: "Park Street", lat: 42.35639457, lng: -71.0624242, stop_id: "place-pktrm"},
{name: "Downtown Crossing", lat: 42.355518, lng: -71.060225, stop_id: "place-dwnxg"},
{name: "South Station", lat: 42.352271, lng: -71.05524200000001, stop_id: "place-sstat"},
{name: "Broadway", lat: 42.342622, lng: -71.056967, stop_id: "place-brdwy"},
{name: "Andrew", lat: 42.330154, lng: -71.057655, stop_id: "place-andrw"},
{name: "JFK/Umass", lat: 42.320685, lng: -71.052391, stop_id: "place-jfk"},
{name: "Savin Hill", lat: 42.31129, lng: -71.053331, stop_id: "place-shmnl"},
{name: "Fields Corner", lat: 42.300093, lng: -71.061667, stop_id: "place-fldcr"},
{name: "Shawmut", lat: 42.29312583, lng: -71.06573796000001, stop_id: "place-smmnl"},
{name: "Ashmont", lat: 42.284652, lng: -71.06448899999999, stop_id: "place-asmnl"},
]

var braintree = [
{name: "JFK/Umass", lat: 42.320685, lng: -71.052391, stop_id: "place-jfk"},
{name: "North Quincy", lat: 42.275275, lng: -71.029583, stop_id: "place-nqncy"},
{name: "Wollaston", lat: 42.2665139, lng: -71.0203369, stop_id: "place-wlsta"},
{name: "Quincy Center", lat: 42.251809, lng: -71.005409, stop_id: "place-qnctr"},
{name: "Quincy Adams", lat: 42.233391, lng: -71.007153, stop_id: "place-qamnl"},
{name: "Braintree", lat: 42.2078543, lng: -71.0011385, stop_id: "place-brntn"}
]

var map;
map = new google.maps.Map(document.getElementById("map"), {
  center: ashmont[9],
  zoom: 13
});

/* Generate all markers */
for (i = 0; i < ashmont.length + braintree.length + 1; i++) {
  /* Don't double-mark JFK/UMass */
  if (i < ashmont.length) {
    marker = new google.maps.Marker({position: ashmont[i], 
      label: ashmont[i].name, 
      title: ashmont[i].stop_id, 
      map: map, 
      icon: icon});

    marker.addListener('click', function() {
      data = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + this.title;
      console.log("data is: " + data);
      var request = new XMLHttpRequest();

      request.open("GET", data, true);
      request.onreadystatechange = function() {
        console.log(request.readyState + ", " + request.status);
        if (request.readyState == 4 && request.status == 200) {
          request = request.responseText;
          stop_times = JSON.parse(request);
          console.log(stop_times);

          contentString = "<h1>Schedule:</h1></br>";
          for (k = 0; k < stop_times.data.length; k++) {
            contentString += "<li>"+ stop_times.data[k].attributes.arrival_time + "</li></br>"
          }

          infoWindow.setContent(contentString);
          console.log("pos is apparently: " + infoWindow.getPosition())
          infoWindow.open(map, this.position);

        } else if (request.readyState == 4 && request.status != 200) {
          console.log("Something went wrong!");
          infoWindow.setContent("Whoops…something went wrong!");
          infoWindow.open(map, this.position)
        } else {
          console.log("in progress...");
        }
      }

      request.send();
    })

    marker.setMap(map);

  } else if (i != ashmont.length) {
      marker = new google.maps.Marker({position: braintree[j], title: braintree[j].name, map: map, icon: icon});
      marker.setMap(map);

     //id = braintree[j].stop_id;
      
      marker.addListener('click', function() {
        var request = new XMLHttpRequest();
        data = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + marker.stop_id;
        console.log(data);

        request.open("GET", data, true);
        request.onreadystatechange = function() {
          if (request.readyState == 4 && request.status == 200) {
            request = request.responseText;
            stop_times = JSON.parse(request);
            contentString = "<strong>Schedule</strong>";
            for (k = 0; k < stop_times.data.length; k++) {
              contentString += "<li>"+ stop_times.data[k].attributes.arrival_time + "</li></br>"
            }
          }
        }
        request.send();

        infoWindow.setContent(contentString);
        infoWindow.open(map, this);
      });

      j++;
    }
  
  if (i < ashmont.length) {
    polyline = new google.maps.Polyline({
      path: ashmont,
      strokeColor: 'red'
    });
  } else {
    polyline = new google.maps.Polyline({
      path: braintree,
      strokeColor: 'red'
    });
  }
  polyline.setMap(map);
}

/* Calculate closest stop */
j = 0;
for (i = 0; i < ashmont.length + braintree.length + 1; i++) {
  if (i < ashmont.length) {


  } else if (i != ashmont.length) {
    
    j++;
  }
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




