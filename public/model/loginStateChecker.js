 //This function runs everytime the auth state changes. Use to verify if the user is logged in
     //*** this function will be called from everywhere except Sign Up Page
window.checkState=function(page)
{
  console.log("Page er value"+page);

  firebase.auth().onAuthStateChanged(function(user)
  {
    if (user)
    {
      console.log("USER LOGGED IN");
      if(page==1)
      {
            setUserDetails(user.uid,1);
      }
      else
       {
            readUserData(user.uid,2);
      }
    } else
    {
      // No user is signed in.
      console.log("USER NOT LOGGED IN");
    }
  });
}
