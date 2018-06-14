function initMap() {
  /* Set markers and polylines */
  var ashmont = [
  {lat: 42.395428, lng: -71.142483, stop_id: "place-alfcl"}, /* Alewife */
  {lat: 42.39674, lng: -71.121815, stop_id: "place-davis"}, /* Davis */
  {lat: 42.3884, lng: -71.11914899999999, stop_id: "place-portr"}, /* Porter Square */
  {lat: 42.373362, lng: -71.118956, stop_id: "place-harsq"}, /* Harvard Square */
  {lat: 42.365486, lng: -71.103802, stop_id: "place-cntsq"}, /* Central Square */
  {lat: 42.36249079, lng: -71.08617653, stop_id: "place-knncl"}, /* Kendall/MIT */
  {lat: 42.361166, lng: -71.070628, stop_id: "place-chmnl"}, /* Charles/MGH */
  {lat: 42.35639457, lng: -71.0624242, stop_id: "place-pktrm"}, /* Park Street */
  {lat: 42.355518, lng: -71.060225, stop_id: "place-dwnxg"}, /* Downtown Crossing */
  {lat: 42.352271, lng: -71.05524200000001, stop_id: "place-sstat"}, /* South Station */
  {lat: 42.342622, lng: -71.056967, stop_id: "place-brdwy"}, /* Broadway */
  {lat: 42.330154, lng: -71.057655, stop_id: "place-andrw"}, /* Andrew */
  {lat: 42.320685, lng: -71.052391, stop_id: "place-jfk"}, /* JFK/Umass */
  {lat: 42.31129, lng: -71.053331, stop_id: "place-shmnl"}, /* Savin Hill */
  {lat: 42.300093, lng: -71.061667, stop_id: "place-fldcr"}, /* Fields Corner */
  {lat: 42.29312583, lng: -71.06573796000001, stop_id: "place-smmnl"}, /* Shawmut */
  {lat: 42.284652, lng: -71.06448899999999, stop_id: "place-asmnl"}, /* Ashmont */
]

var braintree = [
  {lat: 42.320685, lng: -71.052391, stop_id: "place-jfk"}, /* JFK/Umass */
  {lat: 42.275275, lng: -71.029583, stop_id: "place-nqncy"}, /* North Quincy */
  {lat: 42.2665139, lng: -71.0203369, stop_id: "place-wlsta"}, /* Wollaston */
  {lat: 42.251809, lng: -71.005409, stop_id: "place-qnctr"}, /* Quincy Center */
  {lat: 42.233391, lng: -71.007153, stop_id: "place-qamnl"}, /* Quincy Adams */
  {lat: 42.2078543, lng: -71.0011385, stop_id: "place-brntn"} /* Braintree */
]

var map;
map = new google.maps.Map(document.getElementById("map"), {
  center: ashmont[9],
  zoom: 12
});

var i, polyline, marker;
var j = 0;
var icon = 'redline.png';
for (i = 0; i < ashmont.length + braintree.length + 1; i++) {
  /* Don't double-mark JFK/UMass */
  if (i < ashmont.length) {
    marker = new google.maps.Marker({position: ashmont[i], map: map, icon: icon});
  } else {
    if (i != ashmont.length) {
      marker = new google.maps.Marker({position: braintree[j], map: map, icon: icon});
      j++;
    }
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
  marker.setMap(map);
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

    marker = new google.maps.Marker({position: pos, map: map});
    marker.setMap(map);
  });
}

}


