var firebase = require('./FirebaseConnection');

class AuthenticaltionModel
{

//this variable used to hold the information of all the users including coin
static AllUsersData={};

constructor()
{

}

//this method used for storing user data while signing up
async storeUserData(uid,username,email,phone) 
{

    var initialCoinAmount=20;
    //this code used for storing the user data into the server variables
    AuthenticaltionModel.AllUsersData[uid]={
        'uid':uid,
        'username':username,
        'email':email,
        'phone':phone,
        'coins':initialCoinAmount
    } ;

    console.log("After modifying(signing up a user) server variables:  ");
    for (let [key, value] of AuthenticaltionModel.AllUserDataMap) 
    {
          console.log(key + ' ==== ' +JSON.stringify(value) +"\n");
    }
    //this code used for storing user data into the firebase firestore database
    const usersCollection = firebase.firestore().collection('Users');
    usersCollection.doc(uid).set({
       username:username,
       email:email,
       phone:phone,
       coins:initialCoinAmount
       
   })
   
}
//this method used for storing edited user data after edited by the user
async  editUserData(uid,username,phone)
{
    //this code used for storing the user data into the server variables
    AuthenticaltionModel.AllUsersData[uid]['username']=username;
    AuthenticaltionModel.AllUsersData[uid]['phone']=phone;
   console.log("After modifying server variables(user data):  ");
    for (let [key, value] of AuthenticaltionModel.AllUserDataMap) 
    {
          console.log(key + ' ==== ' +JSON.stringify(value) +"\n");
    }
    //this code used for storing user data into the firebase firestore database in merge mode
    const usersCollection = firebase.firestore().collection('Users');
    usersCollection.doc(uid).set({
       username:username,
       phone:phone
       
   }, {merge: true})
   
}


//this method used for loading all users data to server from cloud firestore on server startup
readUserDataFromDb()
{
    const query = firebase.firestore().collection('Users').get();

    
    query.then(snapshot => {
     snapshot.forEach(users => 
      {
        
            var uid=users.id;
            var email=users.data()['email'];
            var phone=users.data()['phone'];
            var username=users.data()['username'];
            var coins=users.data()['coins'];
            AuthenticaltionModel.AllUsersData[uid]={
                'uid':uid,
                'username':username,
                'email':email,
                'phone':phone,
                'coins':coins
            } ;
               
        
      });
        AuthenticaltionModel.AllUserDataMap = new Map(Object.entries(AuthenticaltionModel.AllUsersData));
        //printing all user details on server
        console.log("printing all user details on server: ");
        for (let [key, value] of AuthenticaltionModel.AllUserDataMap) 
        {
              console.log(key + ' ==== ' +JSON.stringify(value) +"\n");
        }
         
        
   })
   .catch(error => {
     console.error(error);
   });
    
    
}
//this method used to fetch data from server to client side
readUserData(uid)
{ 
    var userInfo=AuthenticaltionModel.AllUsersData[uid];
    return userInfo;
}



}


module.exports={
    AuthenticaltionModel
}