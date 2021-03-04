		
function init() { 

  /*//Add custom ZoomControl with ZoomHome
  var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(map);  */

//baseLayers
var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
    streets   = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

 //New Map
 var map = L.map('map', {
    center: [40.410368, -3.734896],
    zoom: 6,
    zoomControl: false,
    layers: [grayscale]
 }); 

  /* //Font Awesome Style
  var style = L.AwesomeMarkers.icon ({
    icon: 'shopping-cart',
    prefix: 'fa',
    markerColor: 'darkred'
  });  */

  /* var tiendas = L.geoJson(null, {
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
  });    *\

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
    "Grayscale": grayscale,
    "Streets": streets
  };
  /*
  var overLayers = {
    "Stores": tiendas
   /* "Service Area": serviceArea,
    "Clients": clients 
  }; */
  
  //Layer and Scale Controls
  L.control.layers (baseLayers,overLayers).addTo(map); 
  L.control.scale().addTo(map);  
  //{collapsed: false}
  
  //Leaflet Search
  //Canviat l'atribut "title" per "Sfid" a l'arxiu base del plugin
  //map.addControl( new L.Control.Search({layer:tiendas}) ); 
  
}	



