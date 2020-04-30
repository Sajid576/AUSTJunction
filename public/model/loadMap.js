window.map=0;

window.initMap=function()
{
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqaWQ1NzYiLCJhIjoiY2s5aXU4NXpiMGFqMTNnbWd3eG0zcW05diJ9.A8zwgXej-dY9mH3WOQxFMA';
       map = new mapboxgl.Map({
            
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [latitude,longitude], // initial map center in [lon, lat]
            zoom: 12
      });


      console.log(latitude+","+longitude);
      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
        })
      );
}

initMap();





