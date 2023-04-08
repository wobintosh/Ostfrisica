// Template by http://github.com/jackdougherty/leaflet-map/

// Festlegung Kartenbereich
var map = L.map('map', {
  center: [53.510146,7.802865], //aus Eckpunkten berechnet mit https://www.geomidpoint.com/, Eckpunkte aus Maperitive
  zoom: 10,
  zoomControl: false,
  scrollWheelZoom: true
});

// Attribution
map.attributionControl
.setPrefix('<a href="https://github.com/wobintosh/Ostfrisica">GitHub</a>, Created with <a href="http://leafletjs.com" title="Leaflet">Leaflet</a>');

// Controls
// L.Control.geocoder({position: "topleft"}).addTo(map);
// L.control.scale().addTo(map);
L.control.zoomLabel({position: "topright"}).addTo(map); // optional Zoom Label for map construction
L.control.zoom({position: "topright"}).addTo(map); // Reposition zoom control other than default topleft
// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright",
  collapsed: false
}).addTo(map);

// Kartenlayer
//var lightAll = new L.tileLayer('http://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {		// Tiles von OSM
var lightAll = new L.tileLayer('../data/tiles/{z}/{x}/{y}.png', {		// Lokale Tiles
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Mitwirkende',
	maxZoom: 10
}).addTo(map); // adds layer by default

$.getJSON("data/gemeinden.geojson", function (data) {
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'blue',
        'weight': 2,
        'fillColor': '#fff',
        'fillOpacity': 0
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.GEN) // change 'Town' to match your geojson property labels
    }
  }).addTo(map);
  controlLayers.addOverlay(geoJsonLayer, 'Gemeinden (Blau)');  // insert your 'Title' to add to legend
});

$.getJSON("data/landkreise.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'red',
        'weight': 2,
        'fillColor': '#fff',
        'fillOpacity': 0
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.GEN)
    }
  }).addTo(map);
  controlLayers.addOverlay(geoJsonLayer, 'Landkreise (Rot)');  // insert your 'Title' to add to legend
});
