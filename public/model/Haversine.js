
//this function listens for location change of all bus
listenForBusLocationChanges=function()
{
  const usersCollection = database.collection('bus_location');
  usersCollection.where('active', '==', 1).onSnapshot(snapshot => {
      snapshot.forEach(user => {
              
              if(user.exists)
              {
                  var bus_data=user.data();

                 if(checkUniversityRadius(bus_data['coordinate'].latitude,bus_data['coordinate'].longitude))
                 {
                    var userList=fireModel.readBusSubscriberData(bus_data['bus_name']);
                    console.log("User list is:  "+userList)
                    emailNotifier.sendEmailNotification("cybersajid1997@gmail.com");
                 } 
                 /* console.log(user.id+"---->"+bus_data['coordinate'].latitude+","+bus_data['coordinate'].longitude
                  +"-->"+bus_data['velocity']+"--->"+bus_data['active']);  */

              }
              
        });
    });
}

listenForBusLocationChanges();