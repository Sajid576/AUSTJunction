
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


checkState(1);


window.setUserDetails = function(uid)
{
  //console.log("username:  "+localStorage.getItem("userName"));
  
  signUp_logout.innerHTML="Log Out";

   //this code set user name on nav bar
  _usernameinhome.innerHTML="Hi, "+localStorage.getItem("userName");
  
  //this code set user name and email on contact details
  _name.value=localStorage.getItem("userName");
  _email.value=localStorage.getItem("email");


}




_sendBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log("Button clicked");
  submitContactUs();
});

function submitContactUs()
{
    
  if ( _name.value == "" || _email.value == "" || _sub.value == "" || _message.value=="")
  {
        alert("Please fill up all fields!");
  }
  else
  {
        storeContactData(_name.value,_email.value,_sub.value,_message.value);
  }
    


}

 //this function will be used to store user data into firebase
 function storeContactData(user_name,email,sub,message)
 {
     const usersCollection = firebase.firestore().collection('ContactUs');
     usersCollection.add({
        username: user_name,
        email:email,
        sub:sub,
        message:message
    })
    .then(()=>{
             alert('Data has been saved successfully !')})


        
    .catch(error => {
             alert(error)
     });
}