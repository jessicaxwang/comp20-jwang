function initMap() {
var ashmont = [
  {lat: 42.395428, lng: -71.142483}, /* Alewife */
  {lat: 42.39674, lng: -71.121815}, /* Davis */
  {lat: 42.3884, lng: -71.11914899999999}, /* Porter Square */
  {lat: 42.373362, lng: -71.118956}, /* Harvard Square */
  {lat: 42.365486, lng: -71.103802}, /* Central Square */
  {lat: 42.36249079, lng: -71.08617653}, /* Kendall/MIT */
  {lat: 42.361166, lng: -71.070628}, /* Charles/MGH */
  {lat: 42.35639457, lng: -71.0624242}, /* Park Street */
  {lat: 42.355518, lng: -71.060225}, /* Downtown Crossing */
  {lat: 42.352271, lng: -71.05524200000001}, /* South Station */
  {lat: 42.342622, lng: -71.056967}, /* Broadway */
  {lat: 42.330154, lng: -71.057655}, /* Andrew */
  {lat: 42.320685, lng: -71.052391}, /* JFK/Umass */
  {lat: 42.31129, lng: -71.053331}, /* Savin Hill */
  {lat: 42.300093, lng: -71.061667}, /* Fields Corner */
  {lat: 42.29312583, lng: -71.06573796000001}, /* Shawmut */
  {lat: 42.284652, lng: -71.06448899999999}, /* Ashmont */
]

var braintree = [
  {lat: 42.320685, lng: -71.052391}, /* JFK/Umass */
  {lat: 42.275275, lng: -71.029583}, /* North Quincy */
  {lat: 42.2665139, lng: -71.0203369}, /* Wollaston */
  {lat: 42.251809, lng: -71.005409}, /* Quincy Center */
  {lat: 42.233391, lng: -71.007153}, /* Quincy Adams */
  {lat: 42.2078543, lng: -71.0011385} /* Braintree */
]

var map;
map = new google.maps.Map(document.getElementById("map"), {
  center: ashmont[0],
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

}