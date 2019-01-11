// link to USGS site showing all earthquakes in the past day.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  createFeatures(data.features);
});

// function to assign features to each circle
  function styleInformation(feature) {
    return {
      radius: 5 * (feature.properties.mag),
      fillColor: chooseColor(feature.properties.mag),
      color: "#000",
      weight: 1,
      opacity: 0.8,
      stroke: true,
      fillOpacity: 0.35
    };
  }

  // function to chooseColor based on magnitude of the earthquake
  function chooseColor(mag) {
    if (mag > 5.0) {
      return "purple";
    }
    else if (mag > 4.0) {
      return "blue";
    }
    else if (mag > 3.0) {
      return "red";
    }
    else if (mag > 2.0) {
      return "orange";
    }
    else if (mag > 1.0) {
      return "green";
    }
    else {
      return "yellow";
    }
  }

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.title +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");   
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, place) {
      return L.circleMarker(place);
    },
    style: styleInformation,
    onEachFeature: onEachFeature
  });

    // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

// Create a function to get colors (for the legend) based on the magnitude of earth quake
function getColor(d) {
  return d > 5 ? "purple" :
         d > 4 ? "blue" :
         d > 3 ? "red" :
         d > 2 ? "orange" :
         d > 1 ? "green" :
                 "yellow";
}

function createMap(earthquakes) {

  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.emerald",
    accessToken: API_KEY
  });

  // Define baseMaps object to hold base layers
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Creating map object
  var map = L.map("map", {
    center: [33.7749, -90.4194],
    zoom: 3,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  
var info = L.control({
  position: "bottomright"
});

info.onAdd = function () {


    var div = L.DomUtil.create("div", "legend");
    grades = [0, 1, 2, 3, 4, 5],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
  return div};

info.addTo(map);

}