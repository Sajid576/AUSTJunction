//edit button id
var _editDataBtn = document.getElementById("edit_userData");

window.setUserDetailsOnProfile= function()
{
  
    var _username=document.getElementById("userprofile_username");
    var _email=document.getElementById("userprofile_email");
    var _phone=document.getElementById("userprofile_phone");
    var _subscribed_bus=document.getElementById("userprofile_subscribeBus");

    var _subscribed_bus2= _subscribed_bus.options[_subscribed_bus.selectedIndex];
   
    console.log("LEL: "+_subscribed_bus2.value);
    _username.innerHTML=localStorage.getItem("username");
    _email.innerHTML= localStorage.getItem("email");
    _phone.innerHTML=localStorage.getItem("phone");
    _subscribed_bus2.innerHTML=localStorage.getItem("subscribed_bus");

   
  }

  _editDataBtn.addEventListener('click', e => {
    e.preventDefault();
    var uname = document.getElementById("userprofile_username");  
    var em = document.getElementById("userprofile_email");
    var sbus = document.getElementById("userprofile_subscribeBus");
    if(uname.isContentEditable==false && em.isContentEditable==false && sbus.isContentEditable==false)
    {
              uname.contentEditable=true;
              em.contentEditable=true;
              sbus.contentEditable=true;
              document.getElementById("edit_userData").innerHTML="Submit";
              document.getElementById("userprofile_subscribeBus").disabled=false;
   }
   else if(uname.isContentEditable==true && em.isContentEditable==true && sbus.isContentEditable==true)
   {
        uname.contentEditable=false;
        em.contentEditable=false;
        sbus.contentEditable=false;
        requestEditUserData(uname.value,em.value,sbus.value,user.uid);

    }     
    if(document.getElementById("edit_userData").innerHTML="Submit")
    {
        document.getElementById("edit_userData").innerHTML="Edit";
        if(document.getElementById("userprofile_subscribeBus").disabled==false)
        {
            document.getElementById("userprofile_subscribeBus").disabled=true;
        }
   }
  });

   

