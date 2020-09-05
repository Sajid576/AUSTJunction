


class MapController{
    static map;

    latitude=0;
    longitude=0;
    static marker1=null;
    static marker2=null;
    static userMarker=null;
    static markerList=[];
    constructor()
    {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqaWQ1NzYiLCJhIjoiY2s5aXU4NXpiMGFqMTNnbWd3eG0zcW05diJ9.A8zwgXej-dY9mH3WOQxFMA';
        MapController.map = new mapboxgl.Map({
             
             container: 'map',
             style: 'mapbox://styles/mapbox/light-v10',
             center: [0,0], // initial map center in [lon, lat]
             zoom: 12
       });

       // Add geolocate control to the map.
       MapController.map.addControl(
         new mapboxgl.GeolocateControl({
         positionOptions: {enableHighAccuracy: true},
         trackUserLocation: true
         })
       );
    }

    listenForBusLocationChanges=(bus_data)=>
    {
                var busName=bus_data['bus_name'];
                
                var lat=Number(bus_data['coordinate']['_lat']);
                var lon=Number(bus_data['coordinate']['_long']);
                
                MapController.map.flyTo({center: [lon,lat],essential: true });
                
                
                if(MapController.marker1==null)
                {
                    MapController.markerList.push(busName);
                    
                    //custom marker
                    var el = document.createElement('div');
                     el.className = 'marker';

                     // create the popup
                     var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );
                     MapController.marker1 = new mapboxgl.Marker(el)
                         .setLngLat([lon, lat])
                         .setPopup(popup) // sets a popup on this marker
                         .addTo(MapController.map);


                }
                else if(MapController.marker2==null)
                {
                    MapController.markerList.push(busName);

                    //custom marker
                    var el = document.createElement('div');
                    el.className = 'marker';
                     // create the popup
                     var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );
                     MapController.marker2 = new mapboxgl.Marker(el)
                         .setLngLat([lon, lat])
                         .setPopup(popup) // sets a popup on this marker
                         .addTo(MapController.map);
                }


                if(MapController.marker1!=null && MapController.markerList[0]==busName)
                {
                    MapController.marker1.remove();


                     //custom marker
                     var el = document.createElement('div');
                     el.className = 'marker';
                     // create the popup
                    var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );
                    MapController.marker1 = new mapboxgl.Marker(el)
                        .setLngLat([lon, lat])
                        .setPopup(popup) // sets a popup on this marker
                        .addTo(MapController.map);
                }
                if(MapController.marker2!=null && MapController.markerList[1]==busName)
                {
                    MapController.marker2.remove();
                     //custom marker
                     var el = document.createElement('div');
                     el.className = 'marker';
                    // create the popup
                    var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );

                    MapController.marker2 = new mapboxgl.Marker(el)
                        .setLngLat([lon, lat])
                        .setPopup(popup) // sets a popup on this marker
                        .addTo(MapController.map);
                }
                   console.log(bus_data['coordinate']['_lat']+","+
                   bus_data['coordinate']['_long']+"-->"+bus_data['velocity']+
                   "--->"+bus_data['active']);
            
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
                
                    if(MapController.userMarker!=null)
                    {
                        MapController.userMarker.remove();
                    }
                    MapController.userMarker = new mapboxgl.Marker({
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
var mapController= new MapController();

mapController.getUserPosition();
//initLocationFetchThread("Meghna-1");



//testing with dummy
var obj={
    "active": 1,
    "bus_name": "Meghna-1",
    "coordinate": {
        "_lat": 23.782808,
        "_long": 90.398546
    },
    "last_update_time": {
        "seconds": 1589416020,
        "nanoseconds": 0
    },
    "velocity": "3"
};
var obj1={
    "active": 1,
    "bus_name": "Meghna-2",
    "coordinate": {
        "_lat": 23.782856,
        "_long": 90.398567
    },
    "last_update_time": {
        "seconds": 1589416020,
        "nanoseconds": 0
    },
    "velocity": "3"
};
mapController.listenForBusLocationChanges(obj);
mapController.listenForBusLocationChanges(obj1);
