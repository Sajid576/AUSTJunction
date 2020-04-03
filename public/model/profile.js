
window.readUserData= function(uid)
{
    var _username=document.getElementById("userprofile_username");
    var _email=document.getElementById("userprofile_email");
    var _phone=document.getElementById("userprofile_phone");
    var _subscribed_bus=document.getElementById("userprofile_subscribeBus");

    const usersCollection = firebase.firestore().collection('users');

    const query = usersCollection.doc(uid.trim());
    
    query.get()
    .then(user => {
      if(user.exists)
        {
            console.log(user.data());

            var User=user.data();

            _username.innerHTML=User['username'];
            _email.innerHTML=User['email'];
            _phone.innerHTML=User['phone'];
            _subscribed_bus.innerHTML=User['subscribed_bus'];
            

        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
  


}





