		
function init() {

  //New Map
  var map = L.map('map', {
    center: [40.410368, -3.734896],
    zoom: 6,
    zoomControl: false,
    layers: [esri, tiendas]
  }); 

  //Add custom ZoomControl with ZoomHome
  var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(map);

  //OpenSteetMaps Basemap
  var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  // World Street Map d'ESRI
  var esri = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'ESRI &copy;'
  }).addTo(map);
  //Satèl·lit basemap d'ESRI
  var sat = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; &mdash; Source: Esri'
  }); 

   //Font Awesome Style
  var style = L.AwesomeMarkers.icon ({
    icon: 'shopping-cart',
    prefix: 'fa',
    markerColor: 'darkred'
  }); 

  var tiendas = L.geoJson(null, {
    style: function (feature) {
      return feature.properties && feature.properties.style;
    },  

    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, 
        {icon:style}); 
    },

    onEachFeature: function(feature, layer) {
      layer.bindPopup('<h5 align="center"><b> Store ID: ' + feature.properties.tienda + '</b></h5>');
    }

  }).addTo(map); 
   
  //Uploading the GeoJSON's
  $.getJSON('geojson/tiendas.geojson', function(data){
    tiendas.addData(data);
  });  

  /*
  //WMS Geoserver Service Area
   var serviceArea = L.tileLayer.wms("http://traycco.com/geoserver/traycco/wms", {
      layers: 'traycco:servicearea',
      format: 'image/png',
      transparent: "true",      
  }).addTo(map);  -->
  
  //WMS Geoserver CLIENTES IN
  var clients = L.tileLayer.wms("http://traycco.com/geoserver/traycco/wms", {
      layers: 'traycco:clients',
      format: 'image/png',
      transparent: "true",      
  }).addTo(map);     
  */

  var baseLayers = {
    "Callejero": esri,
    "Open Street Map": basemap,    
    "Satelite": sat 
  };

  var overLayers = {
    "Stores": tiendas,
    "Service Area": serviceArea,
    "Clients": clients 
  };

  
  //LayerControl
  L.control.layers (baseLayers,overLayers,{collapsed: false}).addTo(map); 
  
  //Leaflet Search
  //Canviat l'atribut "title" per "Sfid" a l'arxiu base del plugin
  map.addControl( new L.Control.Search({layer:tiendas}) );

  //Scale Control
  L.control.scale().addTo(map);
  
}	



