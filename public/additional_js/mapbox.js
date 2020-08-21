window.latitude=0;
window.longitude=0;
var marker1=null;
var marker2=null;
var userMarker=null;
var markerList=[];
var busName;



 function listenForYourBusLocationChanges(bus_name)
 {
   const usersCollection = firebase.firestore().collection('bus_location');
   usersCollection.where('active', '==', 1).where('bus_name','==',bus_name).onSnapshot(snapshot => {
       snapshot.forEach(user => {
               
               if(user.exists)
               {
                   var bus_data=user.data();

                   busName=user.id;
                   latitude=bus_data['coordinate'].latitude.toFixed(3);
                   longitude=bus_data['coordinate'].longitude.toFixed(3);



                   map.flyTo({
                    center: [
                    longitude,
                    latitude
                    ],
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
                
                if(marker1==null)
                {
                    markerList.push(busName);
                    
                    //custom marker
                    var el = document.createElement('div');
                     el.className = 'marker';

                     // create the popup
                     var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );
                     marker1 = new mapboxgl.Marker(el)
                         .setLngLat([longitude, latitude])
                         .setPopup(popup) // sets a popup on this marker
                         .addTo(map);


                }
                else if(marker2==null)
                {
                    markerList.push(busName);

                    //custom marker
                    var el = document.createElement('div');
                    el.className = 'marker';
                     // create the popup
                     var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );
                     marker2 = new mapboxgl.Marker(el)
                         .setLngLat([longitude, latitude])
                         .setPopup(popup) // sets a popup on this marker
                         .addTo(map);
                }


                if(marker1!=null && markerList[0]==busName)
                {
                    marker1.remove();


                     //custom marker
                     var el = document.createElement('div');
                     el.className = 'marker';
                     // create the popup
                    var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );
                    marker1 = new mapboxgl.Marker(el)
                        .setLngLat([longitude, latitude])
                        .setPopup(popup) // sets a popup on this marker
                        .addTo(map);
                }
                if(marker2!=null && markerList[1]==busName)
                {
                    marker2.remove();


                     //custom marker
                     var el = document.createElement('div');
                     el.className = 'marker';
                    // create the popup
                    var popup = new mapboxgl.Popup({ offset: 25 }).setText(busName );

                    marker2 = new mapboxgl.Marker(el)
                        .setLngLat([longitude, latitude])
                        .setPopup(popup) // sets a popup on this marker
                        .addTo(map);
                }
            

                   console.log(user.id+"---->"+bus_data['coordinate'].latitude+","+bus_data['coordinate'].longitude+
                   "-->"+bus_data['velocity']+"--->"+bus_data['active']);
               }
               
         });
     });
 }
 
 function successCallback (position) 
 {
    //window.alert(position.coords.latitude,",",position.coords.longitude); 
    
    
    var lat=position.coords.latitude.toFixed(4);
    var lon=position.coords.longitude.toFixed(4);
    console.log(lat,",",lon);

   
    if(userMarker!=null)
    {
        userMarker.remove();
    }
    userMarker = new mapboxgl.Marker({
        draggable: false
        })
        .setLngLat([lon, lat])
        .addTo(map);
  
    
    }

  window.getPosition=function() {
            
    if (navigator.geolocation) 
    {
            // supported
            window.alert("Hello");
           // navigator.geolocation.getCurrentPosition(successCallback);
       
            //listens for changing device location with movement
            navigator.geolocation.watchPosition(successCallback);   
            


    }
    else
    {
          window.alert("Your browser dont support tracking device location");
    }
}


console.log(localStorage.getItem("BUS_NAME"));
getPosition();
listenForYourBusLocationChanges(localStorage.getItem("BUS_NAME")+"-1");
listenForYourBusLocationChanges(localStorage.getItem("BUS_NAME")+"-2");

