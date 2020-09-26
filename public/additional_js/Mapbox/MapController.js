


class MapController{
    static map;
    static userMarker=null;
    
    latitude=0;
    longitude=0;
    busMarker;
    popup;

    constructor()
    {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqaWQ1NzYiLCJhIjoiY2s5aXU4NXpiMGFqMTNnbWd3eG0zcW05diJ9.A8zwgXej-dY9mH3WOQxFMA';
        MapController.map = new mapboxgl.Map({
             container: 'map',
             style: 'mapbox://styles/mapbox/light-v10',
             center: [0,0], // initial map center in [lon, lat]
             zoom: 15
       });

       // Add geolocate control to the map.
       MapController.map.addControl(
         new mapboxgl.GeolocateControl({
         positionOptions: {enableHighAccuracy: true},
         trackUserLocation: true
         })
       );
    }
    //used to set and update the bus marker position on the mapbox layout
    listenForBusLocationChanges=(bus_data)=>
    {
        var busName=bus_data['bus_name'];
                
        var lat=Number(bus_data['coordinate']['latitude']);
        var lon=Number(bus_data['coordinate']['longitude']);
        
        
        //map will focus on the bus location only once 
        if(this.busMarker==null)
        {
            MapController.map.flyTo({
                center: [lon,lat],
                zoom: 15,
                bearing: 0, 
                essential: true });
            //custom marker
            var el = document.createElement('div');
            el.className = 'marker';
            this.popup = new mapboxgl.Popup({ offset: 25 });
            this.busMarker = new mapboxgl.Marker(el);
        }
        
                       
        if(this.busMarker!=null)
        {
            this.busMarker.remove();
        }
        
        var updatetime=new Date(bus_data['last_update_time']['seconds'] * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        // create the popup
        this.popup.setText(busName+'\n'+bus_data['velocity']+'\n'+ String(updatetime) );
        
        this.busMarker.setLngLat([lon, lat])
                     .setPopup(this.popup) // sets a popup on this marker
                     .addTo(MapController.map);
        

           
        console.log(busName+"----->"+bus_data['coordinate']['latitude']+","+bus_data['coordinate']['longitude']
        +"-->"+bus_data['velocity']+"--->"+bus_data['active']+"--->"+String(updatetime) );
            
    }
    //this method used to track user location
    static getUserPosition=()=> {
            
        if (navigator.geolocation) 
        {
                // supported
               
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

export{
    MapController
}







