
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/analytics");
var nodemailer = require('nodemailer');



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

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sajidahmed696@gmail.com',
    pass: 'cutelooperSAJID'
  }
});


var list = [];

/*this function will be called in server side and will be used to continuously check 
if bus has arrived the varsity */
//returns false if bus is outside the circle/varsity area 
checkUniversityRadius=function(bus_lat,bus_lon)
{
      var varsity_lat=23.7638646;
      var varsity_lon=90.4046308;
      radius=1;   //in km

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(bus_lat - varsity_lat); // deg2rad below
      var dLon = deg2rad(bus_lon - varsity_lon);
      
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(varsity_lat)) * Math.cos(deg2rad(bus_lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
     
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km
      return d<radius;
      

}
function deg2rad(deg) {
   return deg * (Math.PI / 180)
 }




    //this function listens for location change of all bus
      function listenForBusLocationChanges()
      {
        const usersCollection = firebase.firestore().collection('bus_location');
        usersCollection.where('active', '==', 1).onSnapshot(snapshot => {
            snapshot.forEach(eachBus => {
                    
                    if(eachBus.exists)
                    {
                        var bus_data=eachBus.data();
                        if(!checkUniversityRadius(bus_data['coordinate'].latitude,bus_data['coordinate'].longitude))
                        {
                            readBusSubscriberData(String(eachBus.id).trim());
                            console.log(eachBus.id+"---->"+bus_data['coordinate'].latitude+","+
                            bus_data['coordinate'].longitude+"-->"+bus_data['velocity']+"--->"+bus_data['active']);
                        }
                        
                    }
                    
              });
              for(var i=0;i<list.length;i++)
              {
                  sendEmailNotification(list[i]);
              }
              
              list=[];
          });
      }
      
  
      function readBusSubscriberData(bus_name)
      {
        
        const usersCollection = firebase.firestore().collection('users');

        const query = usersCollection.where('subscribed_bus', '==', bus_name);
        
        query.get().then(snapshot => {
          snapshot.forEach(user => {
            var User=user.data();
            
            list.push(String(User['email']).trim());
            
            console.log(user.id, ' => ', User['email']);
          
        });

        return list;
        })
        .catch(error => {
          console.error(error);
        });
      }

      function sendEmailNotification(to)
      {
            var mailOptions = {
              from: 'sajidahmed696@gmail.com',
              to: to,
              subject: 'Bus Koi',
              text: 'Bus has already reached the University'
            };
      
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
      }
      


listenForBusLocationChanges();
      
    