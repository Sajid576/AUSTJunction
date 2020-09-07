 
 //this function used to check if the user logged in or not
  window.checkLogin=()=>
  {

      var page=localStorage.getItem("page");
      console.log("Page:  "+page);
      firebase.auth().onAuthStateChanged(function(user)
      {
        if (user)
        {
          console.log("USER LOGGED IN");
          //if this script is called from home page then 
          //this 'setUserDetailsOnHome' method will be used to set user details on home page
          if(page=='home')
          {     
              setUserDetailsOnHome();
          }
          //if this script is called from Profile page then 
          //this 'setUserDetailsOnProfile' method will be used to set user details on profile page
          else if(page=='profile')
          {
                setUserDetailsOnProfile();
          }
        } else
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
}
checkLogin();


