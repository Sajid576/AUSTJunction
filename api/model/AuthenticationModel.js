var firebase = require('./FirebaseConnection');

class AuthenticaltionModel
{
//this variable used to hold the information of all the users including coin
static AllUsersData={};

constructor()
{

}
logger()
{
    var Mp= new Map(Object.entries(AuthenticaltionModel.AllUsersData));
    //printing all user details on server
    console.log("printing all users data on server: ");
    for (let [key, value] of Mp) 
    {
        console.log(key + ' ==== ' +JSON.stringify(value,null,4) +"\n");
    }
    
}
//this method used for storing user data while signing up
async storeUserData(uid,username,email,phone) 
{

   
    //this code used for storing the user data into the server variables
    AuthenticaltionModel.AllUsersData[uid]={
        'uid':uid,
        'username':username,
        'email':email,
        'phone':phone,
        
    } ;

    this.logger()
    //this code used for storing user data into the firebase firestore database
    const usersCollection = firebase.firestore().collection('users');
    usersCollection.doc(uid).set({
       username:username,
       email:email,
       phone:phone,
       subscribedBus:'null'
       
   })
   
}
//this method used for storing edited user data after edited by the user
async  editUserData(uid,username,email,subscribedBus)
{
    
    //this code used for storing the user data into the server variables
    AuthenticaltionModel.AllUsersData[uid]['username']=username;
    AuthenticaltionModel.AllUsersData[uid]['email']=email;
    AuthenticaltionModel.AllUsersData[uid]['subscribedBus']=subscribedBus;
   
    this.logger()
    //this code used for storing user data into the firebase firestore database in merge mode
    const usersCollection = firebase.firestore().collection('users');
    usersCollection.doc(uid).set({
       username:username,
       email:email,
       subscribedBus:subscribedBus
       
   }, {merge: true})
   
}

//this method used for loading all users data to server from cloud firestore on server startup
readUserDataFromDb()
{
    const query = firebase.firestore().collection('users').get();

    
    query.then(snapshot => {
     snapshot.forEach(users => 
      {
        
            var uid=users.id;
            var email=users.data()['email'];
            var phone=users.data()['phone'];
            var username=users.data()['username'];
            
            AuthenticaltionModel.AllUsersData[uid]={
                'uid':uid,
                'username':username,
                'email':email,
                'phone':phone,
                
            } ;
               
        
      });
        this.logger()
         
        
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
//used to fetch all user data
readAllUserData()
{
    return AllUsersData;
}


}


module.exports={
    AuthenticaltionModel
}