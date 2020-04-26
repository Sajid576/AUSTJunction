window.readUserData= function(uid,page)
{
    var _username=document.getElementById("userprofile_username");
    var _email=document.getElementById("userprofile_email");
    var _phone=document.getElementById("userprofile_phone");
    var _subscribed_bus=document.getElementById("userprofile_subscribeBus");
    var _subscribed_bus2= _subscribed_bus.options[_subscribed_bus.selectedIndex].value;
    console.log(_subscribed_bus2);
    var _editDataBtn = document.getElementById("edit_userData");


    var _usernameinhome=document.getElementById("usernameinhome");

    const usersCollection = firebase.firestore().collection('users');

    const query = usersCollection.doc(uid.trim());

    query.get()
    .then(user => {
      if(user.exists)
        {
            console.log(user.data());

            var User=user.data();

          //  _username.innerHTML=User['username'];
          //  _email.innerHTML=User['email'];
          //  _phone.innerHTML=User['phone'];
          //  _subscribed_bus2.innerHTML=User['subscribed_bus'];
            if(page==1)
            {
              console.log("Home e name print");
              _usernameinhome.innerHTML=User['username'];
            }else{
              _username.innerHTML=User['username'];
              _email.innerHTML=User['email'];
              _phone.innerHTML=User['phone'];
              _subscribed_bus2.innerHTML=User['subscribed_bus'];
            }
            console.log("Page er value print hobe"+page);
          //  _usernameinhome.innerHTML=User['username'];

            //document.getElementById("usernameinhome").innerHTML=_name.value;


        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });




    _editDataBtn.addEventListener('click', e => {
      e.preventDefault();
     var uname = document.getElementById("userprofile_username");  //check boolean//
     var em = document.getElementById("userprofile_email");
     var sbus = document.getElementById("userprofile_subscribeBus");
     if(uname.isContentEditable==false && em.isContentEditable==false && sbus.isContentEditable==false)
     {
     uname.contentEditable=true;
     console.log("Uname" +uname.isContentEditable);
     em.contentEditable=true;
     console.log("Email" +em.isContentEditable);
     sbus.contentEditable=true;
     console.log("BUs" +sbus.isContentEditable);

     document.getElementById("edit_userData").innerHTML="Submit";
     console.log("CheckIF");
     document.getElementById("userprofile_subscribeBus").disabled=false;
   }else if(uname.isContentEditable==true && em.isContentEditable==true && sbus.isContentEditable==true)
   {
     uname.contentEditable=false;
     console.log("Uname1" +uname.isContentEditable);
     em.contentEditable=false;
      console.log("Email1" +em.isContentEditable);
      sbus.contentEditable=false;
      console.log("BUS1" +sbus.isContentEditable);

     if(document.getElementById("edit_userData").innerHTML="Submit")
     {
       document.getElementById("edit_userData").innerHTML="Edit";
       console.log("CheckELSE");
       if(document.getElementById("userprofile_subscribeBus").disabled==false)
       {
         document.getElementById("userprofile_subscribeBus").disabled=true;
       }
     }

    }
   });

   function EditUserData(_username,_email,_subscribed_bus2,uid)
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
}
