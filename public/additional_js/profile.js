

//this function used to set user details on profile page 
window.setUserDetailsOnProfile= function()
{

    var _username=document.getElementById("userprofile_username");
    var _email=document.getElementById("userprofile_email");
    var _phone=document.getElementById("userprofile_phone");
    var _subscribed_bus=document.getElementById("userprofile_subscribeBus");

    var _subscribed_bus2= _subscribed_bus.options[_subscribed_bus.selectedIndex];

    console.log("LEL: "+_subscribed_bus2.value);
    _username.innerHTML=localStorage.getItem("userName");
    _email.innerHTML= localStorage.getItem("email");
    _phone.innerHTML=localStorage.getItem("phone");
    _subscribed_bus2.innerHTML=localStorage.getItem("subscribed_bus");
  }

   //edit button onclick listener
   document.getElementById("edit_userData").addEventListener('click', e => {
    e.preventDefault();
    
    var uname = document.getElementById("userprofile_username");
    var em = document.getElementById("userprofile_email");
    var sbus = document.getElementById("userprofile_subscribeBus");
    if(document.getElementById("edit_userData").innerHTML=="Edit")
    {
              console.log(uname.innerHTML+","+em.innerHTML+","+sbus.value);
              uname.contentEditable=true;
              em.contentEditable=true;
              sbus.contentEditable=true;
              document.getElementById("edit_userData").innerHTML="Submit";
              document.getElementById("userprofile_subscribeBus").disabled=false;
   }
   else if(document.getElementById("edit_userData").innerHTML=="Submit")
   {
        console.log(uname.innerHTML+","+em.innerHTML+","+sbus.value);
        document.getElementById("edit_userData").innerHTML="Edit";
        document.getElementById("userprofile_subscribeBus").disabled=true;
        uname.contentEditable=false;
        em.contentEditable=false;
        sbus.contentEditable=false;

        localStorage.setItem("userName",String(uname.innerHTML))
        localStorage.setItem("email",String(em.innerHTML))
        localStorage.setItem("subscribed_bus",sbus.value)
        var uid = localStorage.getItem("uid");
        requestEditUserData(String(uname.innerHTML),String(em.innerHTML),sbus.value,uid);

    }
    
  });

  
