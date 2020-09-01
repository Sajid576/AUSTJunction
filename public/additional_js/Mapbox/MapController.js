

var mapController= new MapController();

mapController.getUserPosition();


class MapController{
    static map;

    latitude=0;
    longitude=0;
    marker1=null;
    marker2=null;
    userMarker=null;
    markerList=[];
    busName;

    constructor()
    {

    }

    listenForBusLocationChanges=()=>
    {
        
    }


    //this method used to init the mapbox object
    initMap=()=>
    {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqaWQ1NzYiLCJhIjoiY2s5aXU4NXpiMGFqMTNnbWd3eG0zcW05diJ9.A8zwgXej-dY9mH3WOQxFMA';
        MapController.map = new mapboxgl.Map({
             
             container: 'map',
             style: 'mapbox://styles/mapbox/light-v10',
             center: [latitude,longitude], // initial map center in [lon, lat]
             zoom: 12
       });

       // Add geolocate control to the map.
       MapController.map.addControl(
         new mapboxgl.GeolocateControl({
         positionOptions: {
             enableHighAccuracy: true
             },
             trackUserLocation: true
         })
       );
    }

    //this method used to track user location
    getUserPosition=()=> {
            
        if (navigator.geolocation) 
        {
                // supported
                window.alert("Hello");
               // navigator.geolocation.getCurrentPosition(successCallback);
           
                //listens for changing device location with movement
                navigator.geolocation.watchPosition((position)=>{
                    var lat=position.coords.latitude.toFixed(4);
                    var lon=position.coords.longitude.toFixed(4);
                    
                    this.initMap(lat,lon);
                   
                    if(userMarker!=null)
                    {
                        userMarker.remove();
                    }
                    userMarker = new mapboxgl.Marker({
                        draggable: false
                        })
                        .setLngLat([lon, lat])
                        .addTo(MapController.map);
                });   
                
        }
        else
        {
              window.alert("Your browser dont support tracking device location");
        }
    }

}