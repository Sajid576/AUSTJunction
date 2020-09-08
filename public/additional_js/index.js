//navbar userName Holder id
var _usernameinhome=document.getElementById("usernameinhome");

//navbar sign up/log out button id
var signUp_logout=document.getElementById("login_logout");

//Contact form id's
const _sendBtn = document.getElementById("submit");
const _name = document.getElementById("contact_name");
const _email = document.getElementById("contact_email");
const _sub = document.getElementById("contact_subject");
const _message = document.getElementById("contact_message");

function signoutChecker()
{
   if(signUp_logout.value=="Log Out")
   {
      firebase.auth().signOut();
      console.log("User logged out");
   }

}
//this method used to set user details on home page if user is logged in
window.setUserDetailsOnHome = function()
{
  //console.log("username:  "+localStorage.getItem("userName"));

  signUp_logout.innerHTML="Log Out";

   //this code set user name on nav bar
  _usernameinhome.innerHTML="Hi, "+localStorage.getItem("userName");

  //this code set user name and email on contact details
  _name.value=localStorage.getItem("userName");
  _email.value=localStorage.getItem("email");


}

//onclick listener of 'submit' button for sending contact data
_sendBtn.addEventListener('click', e => {
      e.preventDefault();
      firebase.auth().onAuthStateChanged(function(user)
      {
            if (user)
            {
                  console.log("User logged in");
                  if ( _name.value == "" || _email.value == "" || _sub.value == "" || _message.value=="")
                  {
                        alert("Please fill up all fields!");
                  }
                  else
                  {
                        requestStoreContactData(user.uid ,_name.value,_email.value,_sub.value,_message.value);
                  }
            }
            else
            {
                  // No user is signed in.
                  if(confirm('YOU ARE NOT LOGGED IN.Do you want to login?'))
                  {
                        window.location.replace("./signuppage");
                  }
                  else
                  {
                        console.log("User not logged in");
                  }
            }
      });

});

 // onclick listener of 'submit' button for seeing the realtime bus location
 document.getElementById("submit_busname").onclick = function() {
  var busName = document.getElementById('bus_name').value;
  //storing bus name to local cache
  localStorage.setItem("busName", busName);
  //console.log(localStorage.getItem("busName"));
  //routing to mapbox interface
  window.location.replace("mapbox");
};
