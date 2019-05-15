// Create the createMap function
// Create the tile layer that will be the background of our map
var earthQuake = L.map("map-id", {
  center: [39.09, -94.57],
  zoom: 4.85
})
  // Create a baseMaps object to hold the lightmap layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY}).addTo(earthQuake)

// Create an overlayMaps object to hold the earthQuake layer
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

d3.json(url, function(response) {
  console.log(response);
  for (var i = 0; i < response.data.type.length; i++) {
    var location = [response.data.place[i].lat, response.data.mag[i].lon]
    console.log(location)
    L.marker(location).bindPopup("<h1>" + response.data.title[i].name + "</h1> <hr> <h3> Satellite: " + response.data.title[i].coordinates + "</h3> <h3> faultLines: " + response.data.place[i].faultLines + "<h4> Earthquakes: " + Earthquakes + "</h4>").addTo(earthQuake);
  }; 
})