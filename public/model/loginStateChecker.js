 //This function runs everytime the auth state changes. Use to verify if the user is logged in
     //*** this function will be called from everywhere except Sign Up Page
     firebase.auth().onAuthStateChanged(function(user)
     {
                    
      
       if (user)
       {
         console.log("USER LOGGED IN");
         readUserData(user.uid);

       } else
       {
         // No user is signed in.
         console.log("USER NOT LOGGED IN");
       }
     });
             