var List = require("collections/list");
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/analytics");


 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAdok8FrAVYo4kkepl3pXAOEUIVUsliYBk",
    authDomain: "buskoi.firebaseapp.com",
    databaseURL: "https://buskoi.firebaseio.com",
    projectId: "buskoi",
    storageBucket: "buskoi.appspot.com",
    messagingSenderId: "548182931138",
    appId: "1:548182931138:web:0410f178b31092134c2d5b"
  };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
       
       
        const database = firebase.firestore();
               
        //this function will be called while signing up
         function storeUserData(email,user_name,phone,uid)
         {
             const usersCollection = database.collection('users');
             usersCollection.doc(uid).set({
                username: user_name,
                phone: phone,        
                email:email,
            }, {merge: true})
            .then(()=>{
                 console.log('Data has been saved successfully !')})
            .catch(error => {
                 console.error(error)
             });
        }    
        //storeUserData("rain@gmail.com","Rain","01535155114","MwC7GQqsETPKG3fj5v76");  
    
        function storeBusSubscribeData(bus_name,uid)
        {
            const usersCollection = database.collection('users');
            usersCollection.doc(uid).set({
                subscribed_bus: bus_name,        
           }, {merge: true})
           .then(()=>{
                console.log('Data has been saved successfully !')})
           .catch(error => {
                console.error(error)
            });
       }    
       //storeBusSubscribeData("Meghna");
     
    //this function listens for location change of all bus
      function listenForBusLocationChanges()
      {
        const usersCollection = database.collection('bus_location');
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

      function listenForYourBusLocationChanges(bus_name)
      {
        const usersCollection = database.collection('bus_location');
        usersCollection.where('active', '==', 1).where('bus_name','==',bus_name).onSnapshot(snapshot => {
            snapshot.forEach(user => {
                    
                    if(user.exists)
                    {
                        var bus_data=user.data();

                        console.log(user.id+"---->"+bus_data['coordinate'].latitude+","+bus_data['coordinate'].longitude+
                        "-->"+bus_data['velocity']+"--->"+bus_data['active']);
                    }
                    
              });
          });
      }
      //listenForYourBusLocationChanges("Meghna");

      module.exports.readBusSubscriberData=function(bus_name)
      {
        var list = new List();
        const usersCollection = database.collection('users');

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