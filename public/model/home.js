  checkState(1);

window.readUserName = function(uid)
{
  const usersCollection = firebase.firestore().collection('users');

  const query = usersCollection.doc(uid.trim());

  var _usernameinhome=document.getElementById("usernameinhome");
  query.get()
  .then(user => {
    if(user.exists)
      {
            console.log(user.data());

             var User=user.data();

             _usernameinhome.innerHTML=User['username'];
      }

    else
      console.log('User does not exist !');
    })
  .catch(error => {
    console.error(error);
  });

}