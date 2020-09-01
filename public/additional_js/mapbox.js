


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
 
 
  
  


console.log(localStorage.getItem("BUS_NAME"));

listenForYourBusLocationChanges(localStorage.getItem("BUS_NAME")+"-1");
listenForYourBusLocationChanges(localStorage.getItem("BUS_NAME")+"-2");

