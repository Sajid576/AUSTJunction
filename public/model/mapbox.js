window.latitude=0;
window.longitude=0;
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
                    -34.5  + (Math.random() - 0.5) * 10 ,
                    40+ + (Math.random() - 0.5) * 10,
                    ],
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });

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
   // loadGeoJson(lat,lon);
  
    
    }

 function getPosition() {
            
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



listenForYourBusLocationChanges("Meghna");
getPosition();
