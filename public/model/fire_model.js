//var List = require("collections/list");
//var firebase = require("firebase/app");

// Add the Firebase products that you want to use
//require("firebase/auth");
//require("firebase/firestore");
//require("firebase/analytics");



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
       


    const _name = document.getElementById("name");
    const _email = document.getElementById("email");                      
    const _phone = document.getElementById("phoneNumber");
    const _sendCodeBtn = document.getElementById("send-code");
    const _submitBtn = document.getElementById("submit_data");
              

    _submitBtn.addEventListener('click', e => {
      e.preventDefault();
      var code = document.getElementById("code").value;
      confirmationResult
        .confirm(code)
        .then(function(result) {
          var user = result.user;
          storeUserData(_email.value,_name.value,_phone.value,user.uid);
        })
        .catch(function(error) {
          console.log(error);
        });
      
    });
       
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: function(response) {
          submitUserData();
        }
      }
    );

    _sendCodeBtn.addEventListener('click', e => {
      e.preventDefault();
      sendCode();
    });
    function sendCode()
    {
     
      //storeUserData("SAJJUU@yahoo.com","SAJJU","01535155114","MwC7GQqsETPKG3fj5v76");
      var phoneNumber = document.getElementById("phoneNumber").value;
      console.log(phoneNumber);

         var appVerifier = window.recaptchaVerifier;
         firebase
           .auth()
           .signInWithPhoneNumber(phoneNumber,appVerifier)
           .then(function(confirmationResult)
           {
             window.confirmationResult=confirmationResult;
           })
           .catch(function(error) {
             console.log(error);
           });
     }

    

     //This function runs everytime the auth state changes. Use to verify if the user is logged in
     firebase.auth().onAuthStateChanged(function(user)
     {
                     
       if (user)
       {
         console.log("USER LOGGED IN");
   

       } else
       {
         // No user is signed in.
         console.log("USER NOT LOGGED IN");
       }
     });
               
        //this function will be called while signing up
         function storeUserData(email,user_name,phone,uid)
         {
             const usersCollection = firebase.firestore().collection('users');
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
            const usersCollection = firebase.firestore().collection('users');
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

      function listenForYourBusLocationChanges(bus_name)
      {
        const usersCollection = firebase.firestore().collection('bus_location');
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

      
     