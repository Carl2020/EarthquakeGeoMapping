// Creating map object
var map = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 4
});

  // Add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

// link to USGS site showing all earthquakes in the past day.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(mag) {
    switch (mag) {
    case mag > 5.0:
      return "purple";
    case mag > 4.0:
      return "red";
    case mag > 3.0:
      return "brown";
    case mag > 2.0:
      return "orange";
    case mag > 1.0:
      return "green";
    default:
      return "yellow";
    }
}

d3.json(link, function(feature) {
    // Creating geoJSON layer with the retrieved data
    L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        // style each feature (i.e., each earthquake)
        style: function(feature) {
            return {
                radius: 30 * (feature.properties.mag),
                fillColor: chooseColor(feature.properties.mag),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6
            }
        }
    }).bindPopup("<h3>" + feature.properties.title +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>").addTo(map)
})
    

// geojsonMarkerOptions = {
//     radius: 30,
//     fillColor: chooseColor(feature.properties.mag),
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.6
// };
// // Grabbing our GeoJSON data..
// d3.json(link, function(data) {

//     console.log(data)


//     for (var i = 0; i < data.length; i++) {
//         var point = data.geometry.coordinates;

//         if (point) {
//             L.circle([ data.geometry.coordinates[1], data.geometry.coordinates[0] ])
//                 .addTo(map);
//         }
//     }
// });     
    //layer.bindPopup("<h3>" + feature.properties.title +
     //   "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")

    // Creating a geoJSON layer with the retrieved data
    // L.geoJson(data, {
    // // convert points to circles
    //     pointToLayer: function (geometry) {
    //         return L.circleMarker([geometry.coordinates[1], geometry.coordinates[0]], geojsonMarkerOptions);
    //     }.bindPopup("<h3>" + feature.properties.title +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
    // }).addTo(map);
//});






// // Grabbing our GeoJSON data..
// d3.json(link, function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {



//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//     // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {



//   // Define baseMaps object to hold base layers
//   var baseMaps = {
//     "Street Map": streetmap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   };



//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
// }






