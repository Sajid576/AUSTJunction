
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/analytics");


    readLectures()
    {
        
    }
      
     
    //this function listens for location change of all bus
      function listenForBusLocationChanges()
      {
        const usersCollection = firebase.firestore().collection('bus_location');
        usersCollection.where('active', '==', 1).onSnapshot(snapshot => {
            snapshot.forEach(user => {
                    
                    if(user.exists)
                    {
                        var bus_data=user.data();

                        console.log(user.id+"---->"+bus_data['coordinate'].latitude+","+bus_data['coordinate'].longitude
                        +"-->"+bus_data['velocity']+"--->"+bus_data['active']);
                    }
                    
              });
          });
      }
      
      //listenForBusLocationChanges();

     

      function readBusSubscriberData(bus_name)
      {
        var list = new List();
        const usersCollection = firebase.firestore().collection('users');

        const query = usersCollection.where('subscribed_bus', '==', bus_name);
        
        query.get().then(snapshot => {
          snapshot.forEach(user => {
            var User=user.data();
            list.push(User['email']);
            
            console.log(user.id, ' => ', User['email']);
          
        });

        return list;
        })
        .catch(error => {
          console.error(error);
        });
        


      }

      
    