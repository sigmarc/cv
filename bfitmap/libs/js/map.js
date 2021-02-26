		
function init() {

  //New Map
	var map = L.map('map',{zoomControl: false}).setView([40.444141, -3.700146],11); 

  var zoomHome = L.Control.zoomHome({position: 'topleft'});
  zoomHome.addTo(map);

  //BaseMaps  
  var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 19
  }).addTo(map); 

  //Pane 
  var activePane = map.createPane("activePane"),
      inactivePane = map.createPane("inactivePane");

  //Control that shows state info on hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML = '<h4>Population by District</h4>' +  (props ?
      '<b>' + props.BARRIO + '</b><br />' + props.POBLACION + ' Inhabitants'
      : /*Write something here like: 'Hover over a neighborhood'*/'');
    };

  info.addTo(map);


  //Font Awesome Style
  var style = L.AwesomeMarkers.icon ({
    icon: 'fire',
    prefix: 'fa',
    markerColor: 'orange'
  });

    var store = L.geoJson(null, {
    style: function (feature) {
      return feature.properties && feature.properties.style;
    },  

    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, 
        {icon:style}); 
    },

    onEachFeature: function(feature, layer) {
      layer.bindPopup('<h5 align="center"><b> Store ID: ' + feature.properties.store + '</b></h5>');
    }

  }).addTo(map); 

  //Converteix el GeoJSON de punts en cercles
  var tiendas = L.geoJson(null, {
     style: function (feature) {
        switch (feature.properties.comp) {
          case 101 :                    return {fillColor: "#7a0177"};
          case 102 :                     return {fillColor: "#000000"};
          case 103 :                  return {fillColor: "#006d2c"};
          case 104 :                     return {fillColor: "#fed976"};        
          case 105 :                    return {fillColor: "#f768a1"};
          case 106 :                return {fillColor: "#737373"};
          case 107 :               return {fillColor: "#08519c"};         
        }

      },
    
    pointToLayer: function (feature, latlng) {
      return L.circleMarker (latlng, {
        radius: 5,
        fillColor: "#bd0026",
        color: "#ffffff",
        weight: 1,
        opacity: 2,
        fillOpacity: 0.8,
        pane: "activePane"
      }); 

    },  

    onEachFeature: function(feature, layer) {
        layer.bindPopup('<h5 align="center"><b>' + feature.properties.comp + '</b></h5>');
    }

  }).addTo(map);

    var myStyle = {
    "color": "#081d58",
    "weight": 1.5,
    "fillOpacity": 0.1
  };

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        fillColor: '#081d58',        
        fillOpacity: 0.3
    }); 

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);   
  }  

  function resetHighlight(e) {
    barrios.resetStyle(e.target);
    info.update()
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
  }

  var barrios = L.geoJson (barrios, {
    style : myStyle,
    onEachFeature:onEachFeature
  }).addTo(map);

   //Competidores
  $.getJSON('geojson/tiendas.geojson', function(data){
    tiendas.addData(data);
  }); 

  //Gimnasios Basic-Fit
  $.getJSON('geojson/store.geojson', function(data){
    store.addData(data);
  }); 

  //Gimnasios Basic-Fit
  $.getJSON('geojson/barrios.geojson', function(data){
    barrios.addData(data);
  });

    //Layer Control
  var baseLayers = {
    "Dark Gray": basemap
  };

  var overLayers = {
    "Stores": store,
    "Competitors": tiendas,
    "Districts": barrios      
  };
  
  //Control de capes
  L.control.layers (baseLayers,overLayers,{position:'topleft'}).addTo(map); 
  
  //Scale Control
  L.control.scale().addTo(map);
  
}	



